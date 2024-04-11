

const email_template = ({name  }) => {  

  return (
 `<table align="center" width="100%" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 680px; width: 100%; margin: 0px auto; background-color: rgb(255, 255, 255);">
 <tbody>
   <tr style="width: 100%;">
     <td>
       <table align="center" width="70%" role="presentation" cellspacing="0" cellpadding="0" border="0">
         <tbody>
           <tr>
             <td>
               <div style="text-align: center">                   
                   <img src="https://viveelvino.igeco.mx/logoVEV.png" alt="logo" style="width: 300px;">                 
                   <table width="100%">
                     <tbody>
                       <tr>   
                         <td width="100%">
                           <h1 style="margin:0;color: #DB00AE;font-weight:bold;text-transform: uppercase;">
                             BIENVENIDO, ${name} TU COMPRA SE HA REALIZADO CON ÉXITO.
                           </h1>
                           <p>GRACIAS POR FORMAR PARTE DE <span style="color:#E94568;font-weight:bold;">VIVE EL VINO 2024</span>,</p>                    
                         </td>                          
                       <tr>
                     <tbody>                     
                   </table>
                   <div  style="text-align: justify;">
                     Evento diseñado para el disfrute y el aprendizaje alrededor de esta bebida universal. Reúne a expertos, amantes del vino y viñedos en un ambiente festivo y educativo. Es la plataforma perfecta para mostrar tus vinos y conectarte con nuevos consumidores y profesionales del sector.                      
                   </div>
                   <p style="font-weight:bold;font-size:20px">TE ESPERAMOS</p>
                   <div style="display:flex;place-content:center;">
                       <div style="background-color: #FDA314;color:white;font-weight:bold;font-size:1.2rem;padding:20px;">
                           8 y 9 DE JUNIO 2024
                       </div>
                       <div style="background-color: #DB00AE;color:white;font-weight:bold;font-size:1.2rem;padding:20px;line-height:1;">
                           DISTRITO LEÓN MX<br />
                           <span style="font-size:0.5rem;">INSTALACIONES DE LA FERIA</span>
                       </div>
                   </div>
                   <p style="font-weight:bold;font-size:20px">TE HORARIOS</p>
                   <div style="display:flex;place-content:center;">
                       <div style="background-color: #0E2242;color:white;font-weight:bold;font-size:1.6rem;padding:20px;">
                           8 DE JUNIO <br />11:00 A 9:00 PM
                       </div>
                       <div style="background-color: #20A475;color:white;font-weight:bold;font-size:1.6rem;padding:20px;">
                           9 DE JUNIO <br /> 11:00 A 9:00 PM
                       </div>
                   </div>
                   <p style="font-weight:bold;font-size:20px">TE AÑADIR AL CALENDARIO</p>
                   <div style="text-align:center;padding:20px">
                     <a style="background-color: #0E2242;color:white;padding:20px;border-radius:20px;margin:20px;" href="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20240608T180000Z%2F20240610T000000Z&details=Evento%20dise%C3%B1ado%20para%20el%20disfrute%20y%20el%20aprendizaje%20alrededor%20de%20esta%20bebida%20universal.%20Re%C3%BAne%20a%20expertos%2C%20amantes%20del%20vino%20y%20vi%C3%B1edos%20en%20un%20ambiente%20festivo%20y%20educativo.%20Es%20la%20plataforma%20perfecta%20para%20mostrar%20tus%20vinos%20y%20conectarte%20con%20nuevos%20consumidores%20y%20profesionales%20del%20sector.%0A&location=Distrito%20Le%C3%B3n%20MX%2C%20instalaciones%20de%20la%20feria&text=VIVE%20EL%20VINO"
                     target="_blank">                        
                       Google
                     </a>
                     <a style="background-color: #0E2242;color:white;padding:20px;border-radius:20px;" href="https://outlook.live.com/calendar/0/action/compose?allday=false&body=Evento%20dise%C3%B1ado%20para%20el%20disfrute%20y%20el%20aprendizaje%20alrededor%20de%20esta%20bebida%20universal.%20Re%C3%BAne%20a%20expertos%2C%20amantes%20del%20vino%20y%20vi%C3%B1edos%20en%20un%20ambiente%20festivo%20y%20educativo.%20Es%20la%20plataforma%20perfecta%20para%20mostrar%20tus%20vinos%20y%20conectarte%20con%20nuevos%20consumidores%20y%20profesionales%20del%20sector.%0A&enddt=2024-06-09T18%3A00%3A00&location=Distrito%20Le%C3%B3n%20MX%2C%20instalaciones%20de%20la%20feria&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2024-06-08T12%3A00%3A00&subject=VIVE%20EL%20VINO"
                     target="_blank">                       
                       Outlook
                     </a>
                   </div>                   
                   <div style="margin-top:10px;text-align:center;padding:20px;">
                     <a style="background-color: #0E2242;color:white;padding:20px;border-radius:20px;margin:20px;" href="https://calendar.yahoo.com/?desc=Evento%2520dise%25C3%25B1ado%2520para%2520el%2520disfrute%2520y%2520el%2520aprendizaje%2520alrededor%2520de%2520esta%2520bebida%2520universal.%2520Re%25C3%25BAne%2520a%2520expertos%252C%2520amantes%2520del%2520vino%2520y%2520vi%25C3%25B1edos%2520en%2520un%2520ambiente%2520festivo%2520y%2520educativo.%2520Es%2520la%2520plataforma%2520perfecta%2520para%2520mostrar%2520tus%2520vinos%2520y%2520conectarte%2520con%2520nuevos%2520consumidores%2520y%2520profesionales%2520del%2520sector.%250A&dur=false&et=20240610T000000Z&in_loc=Distrito+Le%C3%B3n+MX%2C+instalaciones+de+la+feria&st=20240608T180000Z&title=VIVE%2520EL%2520VINO&v=60"
                     target="_blank">
                       
                     <i>Y!</i> Yahoo!
                     </a>
                     
                     <a style="background-color: #0E2242;color:white;padding:20px;border-radius:20px;" href="https://viveelvino.igeco.mx/descarga.ics"
                     donwload>                        
                       iCalendar
                     </a>
                   </div>                    
                 </div>
               </div>
             </td>              
           </tr>
         </tbody>
       </table>
       <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="padding: 30px 30px 40px;">
         <tbody>
           <tr>
             <td>                
               <p style="font-size: 15px; line-height: 21px; margin: 16px 0px; color: rgb(60, 63, 68);">INSTRUCCIONES PARA TU VISITA:
               </p>
               <ul>
               <li>
                  IMPORTANTE: Si te registraste en alguna cata o taller debes llegar a la sala respectiva 15 minutos antes de comenzar, en caso contrario se liberarán los espacios para fila de espera.
                </li>
                <li>
                  No se aceptan cambios, cancelaciones o devoluciones.
                </li>
                <li>
                  Para canjear tu boleto, presenta el documento adjunto el dia del evento con una identificación oficial. (Obligatorio)
                </li>
                <li>
                  Ten en cuenta que tu brazalete es personal e intransferible y debe estar visible durante toda tu visita.
                </li>
                <li>
                  Los menores de edad deben ingresar en compañía de 1 adulto.
                </li>
               </ul>
               <hr style="width: 100%; border-top: 1px solid rgb(214, 216, 219); border-right: none rgb(214, 216, 219); border-bottom: none rgb(214, 216, 219); border-left: none rgb(214, 216, 219); border-image: initial; margin: 30px 0px;">
               <p style="font-size: 12px; line-height: 15px; margin: 4px 0px; color: rgb(145, 153, 161);text-align:center;">
                 <strong>IGECO</strong>, Blvrd Francisco Villa 102-piso 14, Oriental, 37510 León, Guanajuato México.
               </p>                              
             </td>
           </tr>
         </tbody>
       </table>
     </td>
   </tr>
 </tbody>
</table>`
  )
}

export {email_template}
