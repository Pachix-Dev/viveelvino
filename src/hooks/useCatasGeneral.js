import { useEffect, useState } from "react"
import {   
    catas_generales_8_junio,
    catas_generales_9_junio,
  } from '../constants_catas.js'
const VINOAPI = import.meta.env.PROD
  ? import.meta.env.PUBLIC_VINOAPI_PROD
  : import.meta.env.PUBLIC_VINOAPI_DEV
  
export function useCatasGeneral() {
  const [catasAvailability8junio, setCatasAvailability8junio] = useState([])
  const [catasAvailability9junio, setCatasAvailability9junio] = useState([])

  useEffect(() => {
    const checkAvailable = async () => {
      const availableCatas8 = {salon_catas1: [], salon_catas2: [], salon_general: []}
      const availableCatas9 = {salon_catas1: [], salon_catas2: [], salon_general: []}
      try {
        const response = await fetch(
          VINOAPI+'/get-catas-general',
        )
        const data = await response.json()        
        
        if (data.status  && data.catasGenerales?.length > 0) {
            catas_generales_8_junio.salon_catas1.map(cata => {
              const available = data.catasGenerales.filter(cataGeneral => cataGeneral.id_cata === cata.id && cataGeneral.date === '8 junio');
              if (available.length < 25) {
                availableCatas8.salon_catas1.push({
                    ...cata,                    
                });
              }else{
                availableCatas8.salon_catas1.push({
                    ...cata,
                    soldOut: true                  
                });
            }

            });
            catas_generales_8_junio.salon_catas2.map(cata => {
                const available = data.catasGenerales.filter(cataGeneral => cataGeneral.id_cata === cata.id && cataGeneral.date === '8 junio');
                if (available.length < 25) {
                  availableCatas8.salon_catas2.push({
                      ...cata,                    
                  });
                }else{
                  availableCatas8.salon_catas2.push({
                      ...cata,
                      soldOut: true                  
                  });
                }
            });
            catas_generales_8_junio.salon_general.map(cata => {
                const available = data.catasGenerales.filter(cataGeneral => cataGeneral.id_cata === cata.id && cataGeneral.date === '8 junio');
                if (available.length < 25) {
                  availableCatas8.salon_general.push({
                      ...cata,                    
                  });
                }else{
                  availableCatas8.salon_general.push({
                      ...cata,
                      soldOut: true                  
                  });
                }
            });

            catas_generales_9_junio.salon_catas1.map(cata => {
                const available = data.catasGenerales.filter(cataGeneral => cataGeneral.id_cata === cata.id && cataGeneral.date === '9 junio');
                if (available.length < 25) {
                  availableCatas9.salon_catas1.push({
                      ...cata,                    
                  });
                }else{
                  availableCatas9.salon_catas1.push({
                      ...cata,
                      soldOut: true                  
                  });
                }
            });
            catas_generales_9_junio.salon_catas2.map(cata => {
                const available = data.catasGenerales.filter(cataGeneral => cataGeneral.id_cata === cata.id && cataGeneral.date === '9 junio');
                if (available.length < 25) {
                  availableCatas9.salon_catas2.push({
                      ...cata,                    
                  });
                }else{
                  availableCatas9.salon_catas2.push({
                      ...cata,
                      soldOut: true                  
                  });
                }
            });
            catas_generales_9_junio.salon_general.map(cata => {
                const available = data.catasGenerales.filter(cataGeneral => cataGeneral.id_cata === cata.id && cataGeneral.date === '9 junio');
                if (available.length < 25) {
                  availableCatas9.salon_general.push({
                      ...cata,                    
                  });
                }else{
                  availableCatas9.salon_general.push({
                      ...cata,
                      soldOut: true                  
                  });
                }
            });
            
            setCatasAvailability8junio(availableCatas8)
            setCatasAvailability9junio(availableCatas9)
        }else{
          setCatasAvailability8junio(catas_generales_8_junio)
          setCatasAvailability9junio(catas_generales_9_junio)
        } 
                    
      } catch (error) {
        console.error(`Error checking availability for Catas Generales`)
        // Handle error as needed
      }

      
    }

    checkAvailable()
  }, [])
  
  return { catasAvailability8junio, catasAvailability9junio }
}