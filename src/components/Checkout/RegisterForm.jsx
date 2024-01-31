import { useForm } from 'react-hook-form'
import { userRegister } from '../../store/userRegister'

export function RegisterForm() {
  const {
    name,
    email,
    phone,
    age,
    company,
    setName,
    setEmail,
    setPhone,
    setAge,
    setCompany,
    addCompanions,
  } = userRegister()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name,
      email,
      phone,
      age,
      company,
    },
  })

  const onSubmit = (data) => console.log(data)

  return (
    <>
      <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-lg text-center'>
          <p className='mt-4 text-gray-500 font-bold'>
            Proporciona la información requerida, por favor revisa que tus datos
            estén correctos.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mx-auto mb-0 mt-8 max-w-md space-y-4'
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
              })}
              name='name'
              id='name'
              defaultValue={name}
              className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
              placeholder='Ingresa tu nombre completo'
              onChange={(e) => {
                setName(e.target.value)
                setValue('name', e.target.value)
              }}
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
              })}
              name='email'
              id='email'
              className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
              placeholder='Enter tu email'
              onChange={(e) => setEmail(e.target.value)}
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
              })}
              name='phone'
              id='phone'
              className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
              placeholder='Ingresa tu numero de teléfono'
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
              name='company'
              id='company'
              className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
              placeholder='Empresa (opcional)'
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

          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white'
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
