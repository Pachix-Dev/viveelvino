import { useNearScreen } from '../hooks/useNearScreen'
import { Bullets } from './Bullets'

export function Results_2023({
  exhibitor_int,
  visitors_int,
  food_options,
  tags,
  exp,
  media,
}) {
  const [show, ref] = useNearScreen()
  return (
    <section
      ref={ref}
      className='mt-20 container mx-auto px-4 grid md:grid-cols-3 uppercase'
    >
      {show && (
        <>
          <div>
            <img
              src='/img/bg_numbers_1.webp'
              className='w-full h-[300px] object-cover object-center'
              alt='Vive el Vino 2024'
            />
            <div className='bg-[#FDA314] text-[#FCE9CD] text-center font-extrabold p-10 h-full'>
              <Bullets number='80' duration='4' />
              {exhibitor_int}
            </div>
          </div>
          <div>
            <img
              src='/img/bg_numbers_2.webp'
              className='w-full h-[300px] object-cover object-center'
              alt='Vive el Vino 2024'
            />
            <div className='bg-[#20A475] text-[#0E553B] text-center font-extrabold p-10 h-full'>
              <Bullets number='2500' duration='4' />
              {visitors_int}
            </div>
          </div>
          <div>
            <img
              src='/img/bg_numbers_3.webp'
              className='w-full h-[300px] object-cover object-center'
              alt='Vive el Vino 2024'
            />
            <div className='bg-[#DB00AE] text-[#71085F] text-center font-extrabold p-10 h-full'>
              <Bullets number='15' duration='5' />
              {food_options}
            </div>
          </div>
          <div>
            <img
              src='/img/bg_numbers_5.webp'
              className='w-full h-[300px] object-cover object-center'
              alt='Vive el Vino 2024'
            />
            <div className=' text-[#DB00AE] text-center font-extrabold p-10 h-full'>
              <Bullets number='250' duration='4' />
              {tags}
            </div>
          </div>
          <div>
            <img
              src='/img/bg_numbers_6.webp'
              className='w-full h-[300px] object-cover object-center'
              alt='Vive el Vino 2024'
            />
            <div className=' text-[#283A57] text-center font-extrabold p-10 h-full'>
              <Bullets number='35' duration='5' />
              {exp}
            </div>
          </div>
          <div>
            <img
              src='/img/bg_numbers_4.webp'
              className='w-full h-[300px] object-cover object-center'
              alt='Vive el Vino 2024'
            />
            <div className=' text-[#38AE84] text-center font-extrabold p-10 h-full'>
              <Bullets number='150' duration='5' />
              {media}
            </div>
          </div>
        </>
      )}
    </section>
  )
}
