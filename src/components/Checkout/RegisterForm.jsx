import { useForm } from 'react-hook-form'
import { userRegister } from '../../store/userRegister'
import useCartStore from '../../store/cartStore'
import { useState } from 'react'

export function RegisterForm() {
  const {
    name,
    email,
    phone,
    companions,
    setName,
    setEmail,
    setPhone,
    completed,
    setCompleted,
    updateCompanionName,
    updateCompanionEmail,
    dropState,
  } = userRegister()

  const { total, items, clearCart, setcomplete_purchase } = useCartStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({})

  const onSubmit = () => setCompleted(true)
  const [processing, setProcessing] = useState(false)

  const freeBuy = async () => {
    if (total === 0) {
      setProcessing(true)
      const response = await fetch(
        'https://viveelvino.igeco.mx/backend/complete-order-free',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items,
            total,
            name,
            email,
            phone,
            companions,
          }),
        }
      )
      const orderData = await response.json()
      if (orderData.status) {
        dropState()
        clearCart()
        setcomplete_purchase(true)
        window.location.href = '/thanks-for-your-purchase'
      }
      console.log(orderData)
    }
  }

  const buttonclass = completed
    ? 'mt-5 w-full inline-block rounded-lg bg-blue-500 px-5 py-3 text-2xl font-bold text-white'
    : 'mt-5 w-full inline-block rounded-lg bg-gray-500 px-5 py-3 text-2xl font-bold text-white'

  return (
    <>
      <div className='mt-10 px-4 py-7 sm:px-6 lg:px-8 border rounded-2xl shadow-lg'>
        <div className='flex justify-between'>
          <p className='font-bold text-2xl'>Regístrese</p>
        </div>
        {completed ? (
          <div className='mt-4 grid sm:grid-cols-3'>
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
            <button
              onClick={() => setCompleted(false)}
              className='text-[#941E81] font-bold'
            >
              Editar
            </button>
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

              {companions.map((companion, index) => (
                <div key={index} className='relative'>
                  <p className='font-bold'>Acompañante {index + 1}</p>
                  <div className='mt-2 flex gap-2'>
                    <div className='relative w-full'>
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
                        placeholder='Nombre completo de tu acompañante'
                        autoComplete={`nameCompanion${index}`}
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
                      {errors[`nameCompanion${index}`] && (
                        <p style={{ color: 'red' }}>
                          {errors[`nameCompanion${index}`].message}
                        </p>
                      )}
                    </div>
                    <div className='relative w-full'>
                      <input
                        type='email'
                        {...register(`emailCompanion${index}`, {
                          required: 'Email  es requerido',
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
                        className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                        placeholder='Ingresa el email de tu acompañante'
                        autoComplete={`emailCompanion${index}`}
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
                      {errors[`emailCompanion${index}`] && (
                        <p style={{ color: 'red' }}>
                          {errors[`emailCompanion${index}`].message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <button
                type='submit'
                className='w-full inline-block rounded-lg bg-[#941E81] hover:bg-gray-700 px-5 py-3 text-2xl font-bold text-white'
              >
                Continuar
              </button>
            </form>
          </>
        )}
        {total === 0 ? (
          <button
            onClick={freeBuy}
            type='submit'
            disabled={!completed}
            className={buttonclass}
          >
            Finalizar
          </button>
        ) : (
          ''
        )}
      </div>
      {processing && (
        <div className='absolute top-0 left-0 bg-gray-400 bg-opacity-85 z-[999] w-full h-screen'>
          <div role='status' className='grid place-items-center w-full h-full'>
            <p className='text-center flex gap-2'>
              <svg
                aria-hidden='true'
                className='w-8 h-8 text-gray-200 animate-spin fill-blue-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              <span className='font-bold text-white text-2xl'>
                Estamos procesando la información por favor espere...
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  )
}
