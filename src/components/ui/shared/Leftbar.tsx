import React, { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'
import { sidebarLinks } from '@/constants/inddex'
import { INavLink } from "@/types/index"

const Leftbar = () => {
  const { mutate: SignOut , isSuccess} = useSignOutAccount();
  // const navigate = useNavigate();
  const {user} = useUserContext();
  const {pathname} = useLocation();
  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>

        <Link to="/" className='flex gap-3 items-center'>
            <img
            src="/assets/images/logo.svg"
            alt='logo'
            width={170}
            height={36}/>
        </Link>

        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
            <img 
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt = "profile"
            className='h-10 w-10 rounded-full'/>

            <div className="flex flex-col">
              <p className='body-bold'>
                {user.name}
              </p>
              <p className='small-regular text-light-3'>
                @{user.username}
              </p>
            </div>

        </Link>

        <ul className='flex flex-col gap-4'>
          {sidebarLinks.map((link : INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'} `}>
              <NavLink 
              to={link.route}
              className="flex gap-5 items-center py-4"
              >
                <img 
                src={link.imgURL}
                className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                />
                {link.label}
              </NavLink>
              </li>
            )
          })}
        </ul>

        <Button variant="ghost" className='shad-button_ghost' onClick={() =>SignOut()}>
        <img
          src="/assets/icons/logout.svg" alt='logout'/>
          <p className='small-medium lg:base-medium'> Logout</p>
        </Button>

      </div>
    </nav>
  )
}

export default Leftbar
