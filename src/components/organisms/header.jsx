import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import { DrawerNav } from './drawer'
import { Button, Typography } from '@material-tailwind/react'
import { Bars3BottomLeftIcon } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types';
import { UserAuth } from '../../context/authContext'
import { IoMdLogOut } from 'react-icons/io'

// const navigation = [
//   { name: 'Dashboard', href: '#', current: true },
//   { name: 'Team', href: '#', current: false },
//   { name: 'Projects', href: '#', current: false },
//   { name: 'Calendar', href: '#', current: false },
// ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

Header.propTypes = {
  openDrawer: PropTypes.func,
  open: PropTypes.bool,
};

export default function Header({ openDrawer, open }) {

  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {

    try {
      await logOut()

    } catch (error) {
      console.log(error);

    }
  }

  return (
    <Disclosure as="nav" className=" z-[99999999] ">
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">



              <div className="flex flex-1 items-center  justify-between">
                <div className="flex flex-shrink-0 items-center">
                  {/* <DrawerNav/> */}
                  <Button variant={'text'} className={` ${open ? 'z-[99]' : '!z-[9999]'}  p-1`} onClick={openDrawer}><Bars3BottomLeftIcon className="h-8 w-8 text-white" /></Button>
                </div>

              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {user ?
                  <Menu as="div" className={`relative ml-3 ${open ? 'z-[99]' : '!z-[9999]'}`}>
                    <div>

                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user?.photoURL}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w- origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item className={'hover:bg-transparent'}>
                          {({ active }) => (
                            <div

                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              <Typography className=' text-ellipsis overflow-hidden' variant='h6'>
                                {user?.displayName}
                              </Typography>
                              <Typography className='w-44 text-ellipsis overflow-hidden text-sm' variant='paragraph'>
                                {user?.email}
                              </Typography>
                            </div>
                          )}
                        </Menu.Item>

                        <Menu.Item >
                          {({ active }) => (
                            <Button
                              onClick={handleSignOut}
                              variant='text'
                              fullWidth

                              className={classNames(active ? 'bg-gray-100' : '', 'flex items-center rounded-none gap-3 px-4 py-2 text-sm text-gray-700')}
                            >
                              <IoMdLogOut className='text-red-600' />
                              Sair
                            </Button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  :
                  null
                }
              </div>
            </div>
          </div>

          {/* <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel> */}
        </>
    </Disclosure>
  )
}
