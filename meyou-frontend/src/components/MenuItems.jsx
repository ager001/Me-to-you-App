import React from 'react'
import { menuItemsData } from '../assets/assets'
import { NavLink } from 'react-router-dom'


{/*Setup of the Side bar Menu */}
const MenuItems = ({setSidebarOpen}) => {
  return (
    <div className='px-6 text-gray-600 space-y-1 font-medium'>
      {
        menuItemsData.map(({to, label, Icon})=>(
            <NavLink key={to} to={to} end={to === '/'} onClick={()=>setSidebarOpen(false)}
             className={({isActive})=>`px-3.5 py-2 flex items-center gap-3
             rounded-xl ${isActive ? 'bg-amber-50 text-amber-700' :
                'hover:bg-gray-50'}`}>
                    <Icon/>
                    {label}
            </NavLink>
        ))
      }
    </div>
  )
}

export default MenuItems
