import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// Helper function to generate QR code as a data URL
async function generateQRDataURL(text) {
    try {
        return await QRCode.toDataURL(text);
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error; // Rethrow to handle it in the calling context
    }
}

function formatAmountMXN(amount) {
    const formattedAmount = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
    }).format(amount)

    return formattedAmount
}

function getSpanishDateString(date) {
    const months = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
  
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    return `${day} de ${months[monthIndex]} de ${year}`;
}

// Function to generate PDF invoice
async function generatePDFInvoice(paypal_id_transaction, body, companions, mainUser) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const outputPath = path.resolve(__dirname, '../invoices');
    const pdfSave = path.join(outputPath, `invoice-${paypal_id_transaction}.pdf`);

    const doc = new PDFDocument();
    const pdfStream = fs.createWriteStream(pdfSave);
    

    
    const qrText = paypal_id_transaction;    
    const logoVev = path.resolve(__dirname, 'logoVEV.png');  

    const imageQr = await generateQRDataURL(qrText);
  
    
    doc.pipe(pdfStream);             
    doc.image(logoVev, 50, 45, { width: 100 });    
    doc
        .fillColor("#444444")
        .fontSize(20)
        .fontSize(10)
        .text("ITALIAN GERMAN EXHIBITION COMPANY ME.", 200, 50, { align: "right" })
        .text("Blvrd Francisco Villa 102-piso 14, Oriental, 37510 ", 200, 65, { align: "right" })
        .text("León de los Aldama, Gto.", 200, 80, { align: "right" })
        .moveDown();
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Recibo de Compra", 50, 160);
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, 185)
        .lineTo(550, 185)
        .stroke();

    doc
        .fontSize(10)
        .text("N° transacción:", 50, 200)
        .font("Helvetica-Bold")
        .text(paypal_id_transaction, 150, 200)
        .font("Helvetica")
        .text("Fecha:", 50, 200 + 15)
        .text(getSpanishDateString(new Date()), 150, 200 + 15)
        .text("Total:", 50, 200 + 30)
        .text(formatAmountMXN(body.total),150,200 + 30)
        .font("Helvetica-Bold")
        .text(body.name, 300, 200)
        .font("Helvetica")
        .text(body.email, 300, 200 + 15)
        .text(body.phone, 300, 200 + 30 )
        .moveDown();
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, 252)
        .lineTo(550, 252)
        .stroke();
        
    doc
        .fontSize(10)
        .text('Descripcion', 50, 280)
        .text('Costo unitario', 280, 280, { width: 90, align: "right" })
        .text('cantidad', 370, 280, { width: 90, align: "right" })
        .text('Total', 0, 280, { align: "right" });
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, 300)
        .lineTo(550, 300)
        .stroke();

    body.items.map((item, index) => {
        doc
        .fontSize(10)
        .text(item.name, 50, 280 + (index + 1)*30)
        .text(formatAmountMXN(item.price), 320, 280 + (index + 1)*30)
        .text(item.quantity, 430, 280 + (index + 1)*30)
        .text(formatAmountMXN(item.price * item.quantity), 0, 280 + (index + 1)*30, { align: "right" });
        doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, 280 + (index + 1)*30 + 20)
        .lineTo(550, 280 + (index + 1)*30 + 20)
        .stroke();
    });
    doc.moveDown(2);    
    doc
        .fontSize(10)
        .text('Subtotal:       '+ formatAmountMXN(body.total), { width: 540, align: "right" });
    doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .text('TOTAL:          ' + formatAmountMXN(body.total), { width: 540, align: "right" });    
    doc.image(imageQr, 50, 650, { width: 100 });

    const qrMainUser = await generateQRDataURL(mainUser.uuid);       

    doc.addPage();
    doc.image(logoVev, 50, 45, { width: 100 });                
    doc
        .fillColor("#444444")    
        .fontSize(10)
        .text("Fecha del evento: 8 - 9 DE JUNIO 2024", 10, 50, { align: "right" })
        .text("Horarios: 11:00 - 9:00 PM", 100, 65, { align: "right" })
        .text("Dirección: Distrito León MX, instalaciones de la feria", 100, 80, { align: "right" })
        .moveDown(5);
    
    doc.text('GRACIAS POR FORMAR PARTE DE VIVE EL VINO 2024, EL FESTIVAL DE VINO QUE ESTABAS ESPERANDO...', 50);
                
    doc.text('Nombre: ' + mainUser.name , 300, 240)
        .text('Correo: '+ mainUser.email, 300, 260)
        .text('Teléfono: ' + mainUser.phone, 300, 280);

    doc.image(qrMainUser, 100, 200, { width: 150 });
    doc.text(mainUser.uuid, 90, 350);

    if(mainUser.catasVip.length > 0) {
        doc.moveDown();
        doc.text('Catas VIP: ', 50).font("Helvetica-Bold");
        mainUser.catasVip.map((cata) => {            
            doc.moveDown();
            doc.text(cata.name, 50).font("Helvetica-Bold")
                .moveDown(0.2)
                .text('Fecha: ' + cata.fecha, 50)
                .moveDown(0.2)
                .text('Hora: ' + cata.hora, 50)
                .moveDown(0.2)
                .text('Lugar: Sala Premier', 50);
            }
        );
    }

    if(mainUser.catas.length > 0) {
        doc.moveDown();
        doc.text('Experiencias de cata o taller / cupo limitado con tiempo de espera, sujeto a disponibilidad: ', 50).font("Helvetica-Bold");
        mainUser.catas.map((cata) => {            
            doc.moveDown();
            doc.text(cata.name, 50).font("Helvetica-Bold")
                .moveDown(0.2)
                .text('Fecha: ' + cata.date, 50)
                .moveDown(0.2)
                .text('Hora: ' + cata.hora, 50)
                .moveDown(0.2)
                .text('Lugar: ' + cata.sala, 50);
            }
        );
    }

    doc.moveDown(2);
    doc.text('INSTRUCCIONES PARA TU VISITA:', 50)
        .text('1.- IMPORTANTE: Si te registraste en alguna cata o taller debes llegar a la sala respectiva 15 minutos antes de comenzar, en caso contrario se liberarán los espacios para fila de espera.',50)
        .text('2.- No se aceptan devoluciones, cambios o cancelaciones',50)
        .text('3.- Para agilizar tu acceso al evento, por favor muestra este comprobante impreso o desde tu dispositivo móvil  en el módulo de visitantes preregistrados con una identificación oficial. (Obligatorio)')
        .text('4.- Ten en cuenta que tu brazalete es personal e intransferible y debe estar visible durante toda tu visita.')
        .text('5.- Los menores de edad deben ingresar en compañía de 1 adulto.');


    if (companions.length > 0) {
        for (const companion of companions) {
            const qrDataURL = await generateQRDataURL(companion.uuid);                

            doc.addPage();
            doc.image(logoVev, 50, 45, { width: 100 });
            doc
                .fillColor("#444444")
                .fontSize(10)
                .text("Fecha del evento: 8 - 9 DE JUNIO 2024", 10, 50, { align: "right" })
                .text("Horarios: 11:00 - 9:00 PM", 100, 65, { align: "right" })
                .text("Dirección: Distrito León MX, instalaciones de la feria", 100, 80, { align: "right" })
                .moveDown(5);
            
            doc.text('GRACIAS POR FORMAR PARTE DE VIVE EL VINO 2024, EL FESTIVAL DE VINO QUE ESTABAS ESPERANDO...', 50);
           
            doc.text('Nombre: ' + companion.name , 300, 260)
               .text('Correo: '+ companion.email, 300, 280);

            doc.image(qrDataURL, 100, 200, { width: 150 });
            doc.text(companion.uuid, 90, 350);

            if(companion.catasVip.length > 0) {
                doc.moveDown();
                doc.text('Catas VIP: ', 50).font("Helvetica-Bold");
                companion.catasVip.map((cata) => {            
                    doc.moveDown();
                    doc.text(cata.name, 50).font("Helvetica-Bold")
                        .moveDown(0.2)
                        .text('Fecha: ' + cata.fecha, 50)
                        .moveDown(0.2)
                        .text('Hora: ' + cata.hora, 50)
                        .moveDown(0.2)
                        .text('Lugar: Sala Premier', 50);
                    }
                );
            }
            if(companion.catas.length > 0) {
                doc.moveDown();
                doc.text('Experiencias de cata o taller / cupo limitado con tiempo de espera, sujeto a disponibilidad: ', 50).font("Helvetica-Bold");
                companion.catas.map((cata) => {            
                    doc.moveDown();
                    doc.text(cata.name, 50).font("Helvetica-Bold")
                        .moveDown(0.2)
                        .text('Fecha: ' + cata.date, 50)
                        .moveDown(0.2)
                        .text('Hora: ' + cata.hora, 50)
                        .moveDown(0.2)
                        .text('Lugar: ' + cata.sala, 50);
                    }
                );
            }

            doc.moveDown(2);
            doc.text('INSTRUCCIONES PARA TU VISITA:', 50)
                .text('1.- IMPORTANTE: Si te registraste en alguna cata o taller debes llegar a la sala respectiva 15 minutos antes de comenzar, en caso contrario se liberarán los espacios para fila de espera.',50)
                .text('2.- No se aceptan devoluciones, cambios o cancelaciones',50)
                .text('3.- Para agilizar tu acceso al evento, por favor muestra este comprobante impreso o desde tu dispositivo móvil  en el módulo de visitantes preregistrados con una identificación oficial. (Obligatorio)')
                .text('4.- Ten en cuenta que tu brazalete es personal e intransferible y debe estar visible durante toda tu visita.')
                .text('5.- Los menores de edad deben ingresar en compañía de 1 adulto.');
        }
    }    
  doc.end();
  return pdfSave;
}

export { generatePDFInvoice };
