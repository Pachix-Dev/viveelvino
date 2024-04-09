import { userRegister } from '../../store/userRegister'

export function SelectCatas({ user, date, catasgenerales = [], sala }) {
  const { addCata, catas, updateCompanionCatas, companions } = userRegister()

  const handleCheckboxChange = (cata) => {
    if (user === 0) {
      if (catas.length === 2) {
        alert('Solo puedes seleccionar 2 catas, elige de nuevo')
        addCata(cata, user, date, sala)
        return
      }
      addCata(cata, user, date, sala)
    } else {
      if (
        companions.some(
          (companion) => companion.catas.length === 2 && user === companion.user
        )
      ) {
        alert('Solo puedes seleccionar 2 catas, elige de nuevo')
        updateCompanionCatas(cata, user, date, sala)
        return
      }
      updateCompanionCatas(cata, user, date, sala)
    }
  }

  return (
    <>
      <div className='list-catas w-80 sm:w-full my-3 text-sm font-medium text-gray-900 bg-white'>
        {catasgenerales.map(
          (checkbox, index) =>
            checkbox.name !== '' &&
            (user === 0 ? (
              <div
                key={index}
                className={`rounded-xl p-2 ${
                  catas.some((cata) => cata.id === checkbox.id)
                    ? 'bg-[#38AE84] text-white'
                    : 'bg-[#F4F4F5] text-black'
                }`}
              >
                <div className='text-center w-max'>
                  <span className='font-extrabold uppercase'>
                    {checkbox.name}
                  </span>
                  <br />
                  <span>{checkbox?.description}</span>
                  <br />
                  <span>{checkbox.hora}</span>
                  <br />

                  {checkbox?.soldOut !== true ? (
                    <input
                      name={checkbox.id}
                      type='radio'
                      value={checkbox.id}
                      checked={catas.some((cata) => cata.id === checkbox.id)}
                      onChange={() => handleCheckboxChange(checkbox)}
                      className='mt-2 bg-gray-100 border-gray-300 rounded focus:ring-[#38AE84] focus:ring-2 cursor-pointer text-[#283A57]'
                    />
                  ) : (
                    <div className='mt-2'>
                      <span className='bg-gray-500 font-bold p-1 text-white rounded-lg'>
                        No disponible
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div
                key={index}
                className={`rounded-xl p-2 ${
                  companions.some(
                    (companion) =>
                      companion.catas.some((cata) => cata.id === checkbox.id) &&
                      user === companion.user
                  )
                    ? 'bg-[#38AE84] text-white'
                    : 'bg-[#F4F4F5] text-black'
                }`}
              >
                <div className='text-center w-max'>
                  <span className='font-extrabold uppercase'>
                    {checkbox.name}
                  </span>
                  <br />
                  <span>{checkbox?.description}</span>
                  <br />
                  <span>{checkbox.hora}</span>
                  <br />
                  {checkbox?.soldOut !== true ? (
                    <input
                      type='radio'
                      checked={companions.some(
                        (companion) =>
                          companion.catas.some(
                            (cata) => cata.id === checkbox.id
                          ) && user === companion.user
                      )}
                      onChange={() => handleCheckboxChange(checkbox)}
                      className='bg-gray-100 border-gray-300 rounded focus:ring-[#38AE84] focus:ring-2 cursor-pointer text-[#283A57]'
                    />
                  ) : (
                    <div className='mt-2'>
                      <span className='bg-gray-500 font-bold p-1 text-white rounded-lg'>
                        No disponible
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
        )}
      </div>
    </>
  )
}
