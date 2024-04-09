import './Catas.css'

import { Tabs } from 'flowbite-react'
import { SelectCatas } from './SelectCatas'
import { Addons } from './Addons'
import useCartStore from '../../store/cartStore'

import { useCatasGeneral } from '../../hooks/useCatasGeneral'
import { useCatasVip } from '../../hooks/useCatasVip'

export function Catas({ user }) {
  const { items } = useCartStore()
  const { catasVip8junio, catasVip9junio } = useCatasVip()
  const { catasAvailability8junio, catasAvailability9junio } = useCatasGeneral()

  return (
    <>
      <p className='mt-2 '>
        <strong>IMPORTANTE</strong> - tu acceso general te permite
        pre-registrarte hasta 2 experiencias de cata o taller / cupo limitado
        con tiempo de espera, sujeto a disponibilidad. A continuación, elige tus
        opciones preferidas, identifica el día, horario y sala de tu
        preferencia.
      </p>

      <Tabs
        aria-label='Default tabs'
        style='default'
        className='mt-2 menuFecha'
      >
        <Tabs.Item active title='SÁBADO 8 JUNIO'>
          <Tabs
            aria-label='Default tabs'
            style='default'
            className='mt-2 submenuFecha'
          >
            <Tabs.Item active title='Sala 1'>
              <div className='overflow-x-scroll scrollstyle'>
                <SelectCatas
                  user={user}
                  date='8 junio'
                  catasgenerales={catasAvailability8junio?.salon_catas1}
                  sala='Sala 1'
                />
              </div>
            </Tabs.Item>
            <Tabs.Item active title='Sala 2'>
              <div className='overflow-x-scroll scrollstyle'>
                <SelectCatas
                  user={user}
                  date={'8 junio'}
                  catasgenerales={catasAvailability8junio?.salon_catas2}
                  sala='Sala 2'
                />
              </div>
            </Tabs.Item>
            <Tabs.Item active title='SALA PREMIER'>
              <div className='overflow-x-scroll scrollstyle'>
                <SelectCatas
                  user={user}
                  date={'8 junio'}
                  catasgenerales={catasAvailability8junio?.salon_general}
                  sala='Sala Premier'
                />
              </div>
            </Tabs.Item>
          </Tabs>

          {items.find((item) => item.id === 1) && (
            <Addons user={user} catas={catasVip8junio} />
          )}
        </Tabs.Item>
        <Tabs.Item title='DOMINGO 9 JUNIO'>
          <Tabs
            aria-label='Default tabs'
            style='default'
            className='mt-2 submenuFecha'
          >
            <Tabs.Item active title='Sala 1'>
              <div className='overflow-x-scroll scrollstyle'>
                <SelectCatas
                  user={user}
                  date='9 junio'
                  catasgenerales={catasAvailability9junio?.salon_catas1}
                  sala='Sala 1'
                />
              </div>
            </Tabs.Item>
            <Tabs.Item active title='Sala 2'>
              <div className='overflow-x-scroll scrollstyle'>
                <SelectCatas
                  user={user}
                  date='9 junio'
                  catasgenerales={catasAvailability9junio?.salon_catas2}
                  sala='Sala 2'
                />
              </div>
            </Tabs.Item>
            <Tabs.Item active title='SALA PREMIER'>
              <div className='overflow-x-scroll scrollstyle'>
                <SelectCatas
                  user={user}
                  date='9 junio'
                  catasgenerales={catasAvailability9junio?.salon_general}
                  sala='Sala Premier'
                />
              </div>
            </Tabs.Item>
          </Tabs>
          {items.find((item) => item.id === 1) && (
            <Addons user={user} catas={catasVip9junio} />
          )}
        </Tabs.Item>
      </Tabs>

      {/*items.find((item) => item.id === 1) && <CatasGeneral user={0} />*/}
    </>
  )
}
