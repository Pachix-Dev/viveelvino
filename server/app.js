import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';
import cors from 'cors';
import { RegisterModel } from './db.js';
import pkg from 'body-parser';
import nodemailer from 'nodemailer';
import {email_template} from './email_Template.js';
import { v4 as uuidv4 } from 'uuid';
import { generatePDFInvoice } from './helpers.js';

const { json } = pkg
const app = express()
app.use(json())
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = ['http://localhost:4321', 'https://igeco.mx', 'https://viveelvino.igeco.mx', 'https://demo.viveelvino.igeco.mx']

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }
    if (!origin) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
  }
}))

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const PORT = process.env.PORT || 3002
const environment = process.env.ENVIRONMENT || 'sandbox';
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const endpoint_url = environment === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

app.post('/create-order', (req, res) => {       
    get_access_token()
        .then(access_token => {
            let order_data_json = {
                'intent': "CAPTURE",
                'purchase_units': [{
                    'amount': {
                        'currency_code': 'MXN',
                        'value': req.body.total                        
                    },                                             
                    'description': 'Venta de boletos Vive el Vino 2024 online',
                }]
            };
            const data = JSON.stringify(order_data_json)

            fetch(endpoint_url + '/v2/checkout/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    },
                    body: data
                })
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    res.send(json);
                }) //Send minimal data to client
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
});

app.post('/complete-order', async (req, res) => {
    const { body } = req;
    
    try {
        const mainUser = { uuid: uuidv4(), name: body.name, email: body.email, phone: body.phone, catasVip: body.items.filter(item => item?.user === 0 ), catas: body.catas};
        
        // validar si quedan espacios disponibles para las catas generales del usuario principal
        if (mainUser.catas.length > 0 && !await checkCataGeneralAvailable(mainUser.catas)) {
            return res.status(400).json({
                status: false,
                message: 'Uno o mas catas/tallares ya no estan disponibles por favor selecciona otras'
            });
        }

        // validar si quedan boletos disponibles para las catas vip del usuario principal
        if (mainUser.catasVip.length > 0 && !await checkTicketAvailability(mainUser.catasVip)) {
            return res.status(400).json({
                status: false,
                message: 'Uno o mas catas VIP ya no estan disponibles por favor selecciona otras'
            });
        }

        // validar si quedan boletos disponibles para las catas vip de los acompañantes
        const companions = body.companions.length > 0
            ? await Promise.all(body.companions.map(async companion => {
                const companionCatasVip = body.items.filter(item => item?.user === companion.user && item.vip);
                const companionCatas = companion.catas;

                if (companionCatasVip.length > 0 && !await checkTicketAvailability(companionCatasVip)) {
                    return res.status(400).json({
                        status: false,
                        message: `Una o mas catas VIP ya no estan disponibles por favor selecciona otras`
                    });
                }

                if (companionCatas.length > 0 && !await checkCataGeneralAvailable(companionCatas)) {
                    return res.status(400).json({
                        status: false,
                        message: `Una o mas catas/talleres ya no estan disponibles por favor selecciona otras`
                    });
                }

                return { uuid: uuidv4(), name: companion.name, email: companion.email, catasVip: companionCatasVip, catas: companionCatas };
            }))
            : [];
        
        const userResponse = await RegisterModel.create_user({ ...mainUser });
        const { insertId } = userResponse;

        if(!userResponse.status){
            return  res.status(500).send({
                status: false,
                message: 'Error al guardar tus datos, por favor intenta de nuevo.'
            });
        }

        
        if (companions.length > 0) {            
            const companionsResponse = await RegisterModel.add_companions(companions);
            if(!companionsResponse.status){
                return res.status(500).send({
                    status: false,
                    message: 'Error al guardar tus datos, por favor intenta de nuevo.'
                });
            }            
        }
        
        const access_token = await get_access_token();
        const response = await fetch(endpoint_url + '/v2/checkout/orders/' + req.body.orderID + '/capture', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        });
                
        const json = await response.json();
        //console.log(JSON.stringify(json));
        if (json.id) {
            if(json.purchase_units[0].payments.captures[0].status === 'COMPLETED' || json.purchase_units[0].payments.captures[0].status === 'PENDING' ){
                
                const paypal_id_order = json.id;
                const paypal_id_transaction = json.purchase_units[0].payments.captures[0].id;                     
                await RegisterModel.save_order(paypal_id_order, paypal_id_transaction, insertId, body.items, body.total);
                
                // Check if there are any coupons to use
                const newArray = body.items.filter(item => item.id === 0 || item.id === 99 ).map(item => item.name);
                if (newArray.length > 0) {
                    await RegisterModel.useCoupon(newArray, insertId);
                }
                
                const pdfAtch = await generatePDFInvoice(paypal_id_transaction, body, companions, mainUser);        

                // Nodemailer setup
                const transporter = nodemailer.createTransport({
                    host: process.env.SMTP_GMAIL,
                    port: process.env.PORT_GMAIL,
                    secure: true,
                    auth: {
                        user: process.env.USER_GMAIL,
                        pass: process.env.PASS_GMAIL
                    }
                });

                // Email options
                const emailContent = email_template({ ...body });
                const mailOptions = {
                    from: process.env.USER_GMAIL,
                    to: body.email,
                    subject: 'Recibo y confirmación de boleto',
                    html: emailContent,
                    attachments: [
                        {
                            filename: `recibo-${paypal_id_transaction}.pdf`,
                            path: pdfAtch,
                            contentType: 'application/pdf'
                        }
                    ]
                };

                await transporter.sendMail(mailOptions);

                res.send({
                    status: true,
                    message: 'Order completed',
                    invoice: `invoice-${paypal_id_transaction}.pdf`
                });
            }
        } else {        
            return res.status(500).send({
                status: false,
                message: 'Tu compra no pudo ser procesada, hay un problema con tu metodo de pago por favor intenta mas tarde...'
            });
        }
                
        

    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: false,
            message: 'Order failed to complete'
        });
    }
});

app.post('/complete-order-free', async (req, res) => {
    const { body } = req;

    if(body.total !== 0 && body.items.filter(item => item.id === 0 || item.id === 99).length === 0){
        return res.status(500).send({
            status: false,
            message: 'Error al guardar tu datos, por favor intenta más tarde...'
        });
    }

    try {
        const mainUser = { uuid: uuidv4(), name: body.name, email: body.email, phone: body.phone, catasVip: body.items.filter(item => item?.user === 0 ), catas: body.catas};

        // validar si quedan espacios disponibles para las catas generales del usuario principal
        if (mainUser.catas.length > 0 && !await checkCataGeneralAvailable(mainUser.catas)) {
            return res.status(400).json({
                status: false,
                message: 'Uno o mas catas/talleres ya no estan disponibles por favor selecciona otras'
            });
        }

        // validar si quedan boletos disponibles para las catas vip del usuario principal
        if (mainUser.catasVip.length > 0 && !await checkTicketAvailability(mainUser.catasVip)) {
            return res.status(400).json({
                status: false,
                message: 'Uno o mas catas VIP ya no estan disponibles por favor selecciona otras'
            });
        }

        // validar si quedan boletos disponibles para las catas vip de los acompañantes
        const companions = body.companions.length > 0
            ? await Promise.all(body.companions.map(async companion => {
                const companionCatasVip = body.items.filter(item => item?.user === companion.user && item.vip);
                const companionCatas = companion.catas;

                if (companionCatasVip.length > 0 && !await checkTicketAvailability(companionCatasVip)) {
                    return res.status(400).json({
                        status: false,
                        message: `Una o mas catas VIP ya no estan disponibles por favor selecciona otras`
                    });
                }

                if (companionCatas.length > 0 && !await checkCataGeneralAvailable(companionCatas)) {
                    return res.status(400).json({
                        status: false,
                        message: `Una o mas catas/talleres ya no estan disponibles por favor selecciona otras`
                    });
                }

                return { uuid: uuidv4(), name: companion.name, email: companion.email, catasVip: companionCatasVip, catas: companionCatas };
            }))
            : [];    
        
        const userResponse = await RegisterModel.create_user({ ...mainUser });
        const { insertId } = userResponse;

        if(!userResponse.status){
            return  res.status(500).send({
                status: false,
                message: 'Error al guardar tus datos, por favor intenta más tarde...'
            });
        }
        
        if (companions.length > 0) {            
            const companionsResponse = await RegisterModel.add_companions(companions);
            if(!companionsResponse.status){
                return res.status(500).send({
                    status: false,
                    message: 'Error al guardar tus datos, por favor intenta más tarde...'
                });
            }            
        }
        
        
        const currentDate = new Date();
        const timestamp = currentDate.getTime();
        const purchased = 'compra-gratis-' + timestamp;

        await RegisterModel.save_order(purchased,purchased, insertId, body.items);
        
        // Check if there are any coupons to use
        const newArray = body.items.filter(item => item.id === 0 || item.id === 99).map(item => item.name);
        if (newArray.length > 0) {
            await RegisterModel.useCoupon(newArray, insertId);
        }
        
        const pdfAtch = await generatePDFInvoice(purchased, body, companions, mainUser);        

        // Nodemailer setup
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_GMAIL,
            port: process.env.PORT_GMAIL,
            secure: true,
            auth: {
                user: process.env.USER_GMAIL,
                pass: process.env.PASS_GMAIL
            }
        });

        // Email options
        const emailContent = email_template({ ...body });
        const mailOptions = {
            from: process.env.USER_GMAIL,
            to: body.email,
            subject: 'Recibo y confirmación de boleto',
            html: emailContent,
            attachments: [
                {
                    filename: `${purchased}.pdf`, // Name of the attached file
                    path: pdfAtch // Path to the PDF file
                }
            ]
        };

        await transporter.sendMail(mailOptions);

        res.send({
            status: true,
            message: 'Order completed',
            invoice: `invoice-${purchased}.pdf`
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: false,
            message: 'Order failed to complete'
        });
    }
});

app.post('/check-coupon', async (req, res) => {
    const { couponCode } = req.body;    
    try{
        const data = await RegisterModel.checkCoupon({ couponCode });
        if(data.length > 0){
            res.send({
                status: true,
                message: 'Coupon is valid',
                couponCode: data[0]
            });
        } else {
            res.send({
                status: false,
                message: 'Coupon is invalid or used already'
            });
        }        
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            status: false,
            message: 'Coupon failed to check'
        });
    }    
});

/*ENPOINTS PARA OPERAR EN SITIO*/
app.get('/user-ticket-verification/:uuid/:code', async (req, res) => {
    const { uuid, code } = req.params;

     // UUID v4 regex validation
     const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
     if (!uuidV4Regex.test(uuid)) {
         return res.status(400).json({
             status: false,
             message: 'Users ticket is invalid or not found. Please try again.'
         });
     }
    try {
        const data = await RegisterModel.pickUpById({ uuid, code });
        if (data) {
            res.json({ // Using res.json for setting appropriate Content-Type
                status: true,
                message: 'User ticket is valid',
                data
            });
        } else {
            // Using 404 Not Found as an example; adjust based on your application's needs
            res.status(404).json({
                status: false,
                message: 'User ticket used already or not found'
            });
        }
    } catch (err) {
        console.error(err); // It's good practice to log the error
        res.status(500).json({ // Respond with 500 Internal Server Error on exceptions
            status: false,
            message: err.sqlState === '23000' ? 'Ya haz asignado este codigo a un usuario' : 'Error al verificar el ticket del usuario'
        });
    }
});

app.get('/user-catas-talleres-verification/:code/:date/:cata', async (req, res) => {
    const { code, date, cata } = req.params;   
    try {
        const data = await RegisterModel.userCatasGeneralVerify({ code, date, cata });
        if (data.status) {
            res.json({ // Using res.json for setting appropriate Content-Type
                status: true,
                message: 'Usuario encontrado en la cata/taller',
                data
            });
        } else {
            // Using 404 Not Found as an example; adjust based on your application's needs
            res.status(404).json({
                status: false,
                message: 'No existen registros de este usuario en catas o talleres generales'
            });
        }
    } catch (err) {
        console.error(err); // It's good practice to log the error
        res.status(500).json({ // Respond with 500 Internal Server Error on exceptions
            status: false,
            message: 'User ticket verification failed'
        });
    }
});

app.get('/user-catas-vip-verification/:code/:date/:cata', async (req, res) => {
    const { code, date, cata } = req.params;   
    try {
        const data = await RegisterModel.userCatasVipVerify({ code, date, cata });
        if (data.status) {
            res.json({ // Using res.json for setting appropriate Content-Type
                status: true,
                message: 'Usuario encontrado en la cata/taller',
                data
            });
        } else {
            // Using 404 Not Found as an example; adjust based on your application's needs
            res.status(404).json({
                status: false,
                message: 'No existen registros de este usuario en catas vip'
            });
        }
    } catch (err) {
        console.error(err); 
        res.status(500).json({
            status: false,
            message: 'Fallo conexion con el servidor'
        });
    }
});

app.put('/user-access', async (req, res) => {
    const { code, action } = req.body;

    try {
        // Check if the user has already checked in or out
        const data = await RegisterModel.userAccess({code, action});
        if (data.status) {
            return  res.json({
                status: true,
                message: `${action} correctamente`
            });
        }else{
            return res.status(404).json({
                status: false,
                message: 'Acción no permitida, el usuario ya ha realizado esta acción anteriormente o no se encuentra registrado en el sistema'
            });
        }                      
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'Error interno al intentar hacer check-in/check-out'
        });
    }
});
/*ENPOINTS PARA OPERAR EN SITIO*/




app.get('/verify-vip-ticket/:cataVip/:date', async (req, res) => {
    const { cataVip, date } = req.params;

    try {
        const data = await RegisterModel.verifyVipTicket({ cataVip, date });
        if (data) {
            res.json({ // Using res.json for setting appropriate Content-Type
                status: true,
                message: 'Aun quedan lugares disponibles para la cata VIP',                
            });
        } else {
            // Using 404 Not Found as an example; adjust based on your application's needs
            res.json({                
                status: false,
                message: 'No hay lugares disponibles para la cata VIP seleccionada'
            });
        }
    } catch (err) {
        console.error(err); // It's good practice to log the error
        res.status(500).json({ // Respond with 500 Internal Server Error on exceptions
            status: false,
            message: 'Error al verificar la disponibilidad de la cata VIP seleccionada intente mas tarde...'
        });
    }
});

app.get('/get-catas-general', async (req, res) => {
    
    try {
        const data = await RegisterModel.getCatasGeneral();
        if (data) {
            res.json({ // Using res.json for setting appropriate Content-Type
                status: true,
                message: 'Aun quedan lugares disponibles para la cata general',
                catasGenerales: data               
            });
        } else {
            // Using 404 Not Found as an example; adjust based on your application's needs
            res.json({                
                status: false,
                message: 'No hay información para mostrar...'
            });
        }
    } catch (err) {
        console.error(err); // It's good practice to log the error
        res.status(500).json({ // Respond with 500 Internal Server Error on exceptions
            status: false,
            message: 'Error al verificar la disponibilidad de la cata general seleccionada intente mas tarde...'
        });
    }
});

app.get('/get-catas-vip', async (req, res) => {
    
    try {
        const data = await RegisterModel.getCatasVip();
        if (data) {
            res.json({ // Using res.json for setting appropriate Content-Type
                status: true,
                message: 'Aun quedan lugares disponibles para la cata VIP',
                catasVip: data               
            });
        } else {
            // Using 404 Not Found as an example; adjust based on your application's needs
            res.json({                
                status: false,
                message: 'No hay información para mostrar...'
            });
        }
    } catch (err) {
        console.error(err); // It's good practice to log the error
        res.status(500).json({ // Respond with 500 Internal Server Error on exceptions
            status: false,
            message: 'Error al verificar la disponibilidad de la cata general seleccionada intente mas tarde...'
        });
    }
});

async function checkTicketAvailability(tickets) {
    try {
        for (const ticket of tickets) {
            const cataVip = ticket.name;
            const date = ticket?.date || ticket?.fecha;
            const response = await RegisterModel.verifyVipTicket({ cataVip, date });                        
            if (!response) {
                return false; // Ticket is not available
            }
        }
        return true; // All tickets are available
    } catch (error) {
        console.error('Error checking ticket availability:', error);
        return false;
    }
}

async function checkCataGeneralAvailable(catas) {
    try {
        for (const cata of catas) {
            const cataGeneral = cata.id;
            const date = cata?.date || cata?.fecha;
            const response = await RegisterModel.verifyGeneralTicket({ cataGeneral, date });                        
            if (!response) {
                return false; // Ticket is not available
            }
        }
        return true; // All tickets are available
    } catch (error) {
        console.error('Error checking ticket availability:', error);
        return false;
    }
}

function get_access_token() {
    const auth = `${client_id}:${client_secret}`
    const data = 'grant_type=client_credentials'
    return fetch(endpoint_url + '/v1/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
            },
            body: data
        })
        .then(res => res.json())
        .then(json => {
            return json.access_token;
        })
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})