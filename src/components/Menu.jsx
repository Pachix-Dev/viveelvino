import { useState } from 'react'
import useCartStore from '../store/cartStore'

export function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const { items } = useCartStore()
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <nav>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
          <div className='flex h-16 items-center justify-between'>
            <div className='inset-y-0 left-0 flex items-center sm:hidden'>
              {/* Mobile menu button */}
              <button
                type='button'
                className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                aria-controls='mobile-menu'
                aria-expanded='false'
                onClick={toggleMenu}
              >
                {/* Hamburger icon */}
                <span className='absolute -inset-0.5'></span>
                <span className='sr-only'>Open main menu</span>
                <svg
                  className={`block h-6 w-6 ${isOpen ? 'hidden' : 'block'}`}
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                  ></path>
                </svg>
                <svg
                  className={` h-6 w-6 ${isOpen ? 'block' : 'hidden'}`}
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  ></path>
                </svg>
              </button>
            </div>

            {/* Logo */}
            <div className='flex flex-shrink-0 items-center'>
              <img
                className='h-8 w-auto'
                src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                alt='Your Company'
              />
            </div>

            {/* Navbar links */}
            <div className='hidden sm:flex items-center space-x-4'>
              {/* Team dropdown */}
              <div className='relative group'>
                <span className='text-gray-300 hover:bg-gray-700 cursor-pointer hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                  QUIÉNES SOMOS
                </span>
                <div className='absolute w-max hidden p-3 space-y-2 bg-white border rounded-md shadow-lg group-hover:block'>
                  <a
                    href='/team/member1'
                    className='block text-sm text-gray-700 p-2 rounded-md hover:bg-gray-100'
                  >
                    Acerca de Vinotelia
                  </a>
                  <a
                    href='/team/member2'
                    className='block text-sm text-gray-700 p-2 rounded-md hover:bg-gray-100'
                  >
                    Acerca de IGECO
                  </a>
                  {/* Add more dropdown items as needed */}
                </div>
              </div>

              {/* Other links */}
              <a
                href='/tickets'
                className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
              >
                tickets
              </a>
              <a
                href='/projects'
                className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
              >
                Projects
              </a>
              <a
                href='/calendar'
                className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
              >
                Calendar
              </a>
            </div>

            {/* Cart */}
            <div className='flex flex-shrink-0 items-center pe-4'>
              <a className='relative' href='shopping-cart'>
                <span className='sr-only'>Open your cart</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-7 h-7 sm:w-8 sm:h-8 pointer-events-none'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                  ></path>
                </svg>
                {items.length > 0 ? (
                  <span className='absolute -right-2 -top-1 sm:-right-1 sm:top-0 bg-emerald-900 text-white text-[12px] rounded-full'>
                    <i className='w-5 h-5 flex justify-center text-center items-center'>
                      {items.length}
                    </i>
                  </span>
                ) : null}
              </a>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}
          id='mobile-menu'
        >
          <div className='space-y-1 px-2 pb-3 pt-2'>
            <span
              href='/'
              className='bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium'
              aria-current='page'
            >
              Dashboard
            </span>
            <ul className='pl-4'>
              <li>
                <a
                  href='/team'
                  className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href='/team'
                  className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
                >
                  Team
                </a>
              </li>
            </ul>
            <a
              href='/team'
              className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
            >
              Team
            </a>
            <a
              href='/projects'
              className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
            >
              Projects
            </a>
            <a
              href='/calendar'
              className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
            >
              Calendar
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}
