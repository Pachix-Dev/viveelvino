import { useEffect, useState } from "react"
import { catas_vip_8_junio, catas_vip_9_junio } from '../constants_catas.js'

export function useCatasVip(){
  const [catasVip8junio, setCatasVip8junio] = useState([])
  const [catasVip9junio, setCatasVip9junio] = useState([])

  useEffect(() => {
    const checkAvailable = async () => {
        const availableCatas8 = []
        const availableCatas9 = []

        try {
          
          const response = await fetch(
            `https://viveelvino.igeco.mx/backend/get-catas-vip`
          )
          const data = await response.json()
          console.log(data)
           
          console.log(data)
          if (data.status  && data.catasVip?.length > 0) {
            catas_vip_8_junio.map(cata => {
                const available = data.catasVip.filter(cataVip => cataVip.name === cata.name && cataVip.date === '8 junio');
                if (available.length < 30) {
                    availableCatas8.push({
                        ...cata,                  
                    });
                }else{
                    availableCatas8.push({
                        ...cata,
                        soldOut: true                  
                    });
                }
            });

            catas_vip_9_junio.map(cata => {
                const available = data.catasVip.filter(cataVip => cataVip.name === cata.name && cataVip.date === '9 junio');
                if (available.length < 30) {
                    availableCatas9.push({
                        ...cata,                    
                    });
                }else{
                    availableCatas8.push({
                        ...cata,
                        soldOut: true                  
                    });
                }
            });
            console.log(availableCatas8)
          }
        } catch (error) {
            console.error(`Error checking availability for Catas Vip`)
          // Handle error as needed
        }
        setCatasVip8junio(availableCatas8)
        setCatasVip9junio(availableCatas9)
      }
      
    checkAvailable()
  }, [])

  return { catasVip8junio, catasVip9junio }
}