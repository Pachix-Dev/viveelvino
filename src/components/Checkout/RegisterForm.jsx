import { useForm } from 'react-hook-form'
import { userRegister } from '../../store/userRegister'
import { useState } from 'react'

export function RegisterForm() {
  const {
    name,
    email,
    phone,
    age,
    company,
    catas,
    companions,
    setName,
    setEmail,
    setPhone,
    completed,
    setCompleted,
    setAge,
    setCompany,
    addCata,
    updateCompanionName,
    updateCompanionEmail,
  } = userRegister()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({})

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([])

  const handleCheckboxChange = (value) => {
    const currentIndex = selectedCheckboxes.indexOf(value)
    const newChecked = [...selectedCheckboxes]

    if (currentIndex === -1) {
      // If not already in array, add to array
      newChecked.push(value)
    } else {
      // If already in array, remove from array
      newChecked.splice(currentIndex, 1)
    }
    // Check if more than 3 are selected, and if so, remove the last one
    if (newChecked.length > 3) {
      newChecked.shift()
    }
    setSelectedCheckboxes(newChecked)
    addCata(newChecked)
  }

  const checkboxes = [
    { value: 1, label: 'Cata 1' },
    { value: 2, label: 'Cata 2' },
    { value: 3, label: 'Cata 3' },
    { value: 4, label: 'Cata 4' },
    { value: 5, label: 'Cata 5' },
    { value: 6, label: 'Cata 6' },
    { value: 7, label: 'Cata 7' },
    { value: 8, label: 'Cata 8' },
  ]
  const onSubmit = () => setCompleted(true)

  return (
    <>
      <div className='mt-10 px-4 py-7 sm:px-6 lg:px-8 border rounded-2xl shadow-lg'>
        <div className='flex justify-between'>
          <p className='font-bold text-2xl'>Regístrese</p>
          <button
            onClick={() => setCompleted(false)}
            className='text-blue-500 font-bold'
          >
            Editar
          </button>
        </div>
        {completed ? (
          <div className='mt-4 grid sm:grid-cols-2'>
            <div>
              <div className='text-gray-500 font-bold'>Nombre Completo</div>
              <div className='font-bold'>{name}</div>
            </div>
            <div>
              <div className='text-gray-500 font-bold'>
                Dirección de Correo Electrónico
              </div>
              <div className='font-bold'>{email}</div>
            </div>
          </div>
        ) : (
          <>
            <p className='mt-4 text-gray-500 font-bold'>
              Proporciona la información requerida, por favor revisa que tus
              datos estén correctos.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className='mx-auto mb-0 mt-8  space-y-4'
            >
              <div className='relative'>
                <input
                  type='text'
                  {...register('name', {
                    required: 'Nombre completo  es requerido',
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: 'Nombre no válido',
                    },
                    onChange: (e) => setName(e.target.value),
                  })}
                  name='name'
                  id='name'
                  defaultValue={name}
                  className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                  placeholder='Ingresa tu nombre completo'
                  autoComplete='name'
                />
                <span className='absolute inset-y-0 end-0 grid place-content-center px-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-4 w-4 text-gray-400'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                    />
                  </svg>
                </span>

                {errors.name && (
                  <p style={{ color: 'red' }}>{errors.name.message}</p>
                )}
              </div>

              <div className='relative'>
                <input
                  type='email'
                  {...register('email', {
                    required: 'Email es requerido',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Email no válido',
                    },
                    onChange: (e) => setEmail(e.target.value),
                  })}
                  defaultValue={email}
                  name='email'
                  id='email'
                  className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                  placeholder='Ingresa tu email'
                  autoComplete='email'
                />

                <span className='absolute inset-y-0 end-0 grid place-content-center px-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 text-gray-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                    />
                  </svg>
                </span>

                {errors.email && (
                  <p style={{ color: 'red' }}>{errors.email.message}</p>
                )}
              </div>

              <div className='relative'>
                <input
                  type='number'
                  {...register('phone', {
                    required: 'Numero de teléfono es requerido',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Teléfono no válido',
                    },
                    onChange: (e) => setPhone(e.target.value),
                  })}
                  defaultValue={phone}
                  name='phone'
                  id='phone'
                  className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                  placeholder='Ingresa tu numero de teléfono'
                  autoComplete='phone'
                />
                <span className='absolute inset-y-0 end-0 grid place-content-center px-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-4 w-4 text-gray-400'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z'
                    />
                  </svg>
                </span>

                {errors.phone && (
                  <p style={{ color: 'red' }}>{errors.phone.message}</p>
                )}
              </div>

              <div className='relative'>
                <input
                  type='text'
                  {...register('company', {
                    onChange: (e) => setCompany(e.target.value),
                  })}
                  name='company'
                  id='company'
                  defaultValue={company}
                  className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                  placeholder='Empresa (opcional)'
                  autoComplete='company'
                />
                <span className='absolute inset-y-0 end-0 grid place-content-center px-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-4 w-4 text-gray-400'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21'
                    />
                  </svg>
                </span>
              </div>

              <div className='relative'>
                <p className='text-gray-500'>
                  (Opcional - tu acceso general te permite realizar hasta 3
                  catas sencillas / cupo limitado con tiempo de espera )
                </p>
                <ul className='mt-5 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex flex-wrap'>
                  {checkboxes.map((checkbox, index) => (
                    <li
                      key={index}
                      className='border-b border-gray-200 sm:border-b-0 sm:border-r'
                    >
                      <div className='flex items-center ps-3'>
                        <input
                          id={checkbox.value}
                          name={checkbox.value}
                          type='checkbox'
                          value={checkbox.value}
                          checked={selectedCheckboxes.includes(checkbox.label)}
                          onChange={() => handleCheckboxChange(checkbox.label)}
                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2'
                        />
                        <label
                          htmlFor={checkbox.value}
                          className='w-full py-3 m-2 text-sm font-medium text-gray-900 '
                        >
                          {checkbox.label}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>

                {errors.checkboxes && (
                  <p style={{ color: 'red' }}>{errors.checkboxes.message}</p>
                )}
              </div>

              {companions.map((companion, index) => (
                <div key={index} className='relative'>
                  <p>Acompañante {index + 1}</p>
                  <input
                    type='text'
                    {...register(`nameCompanion${index}`, {
                      required: 'Nombre completo  es requerido',
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: 'Nombre no válido',
                      },
                      onChange: (e) =>
                        updateCompanionName(index, e.target.value),
                    })}
                    name={`nameCompanion${index}`}
                    id={`nameCompanion${index}`}
                    defaultValue={companion.name}
                    className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                    placeholder='Ingresa tu nombre completo'
                    autoComplete={`nameCompanion${index}`}
                  />
                  {errors[`nameCompanion${index}`] && (
                    <p style={{ color: 'red' }}>
                      {errors[`nameCompanion${index}`].message}
                    </p>
                  )}
                  <input
                    type='email'
                    {...register(`emailCompanion${index}`, {
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Email no válido',
                      },
                      onChange: (e) =>
                        updateCompanionEmail(index, e.target.value),
                    })}
                    defaultValue={companion.email}
                    name={`emailCompanion${index}`}
                    id={`emailCompanion${index}`}
                    className='mt-2 w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                    placeholder='Ingresa tu email'
                    autoComplete={`emailCompanion${index}`}
                  />
                  {errors[`emailCompanion${index}`] && (
                    <p style={{ color: 'red' }}>
                      {errors[`emailCompanion${index}`].message}
                    </p>
                  )}
                </div>
              ))}

              <button
                type='submit'
                className='w-full inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white'
              >
                Continuar
              </button>
            </form>
          </>
        )}
      </div>
    </>
  )
}
