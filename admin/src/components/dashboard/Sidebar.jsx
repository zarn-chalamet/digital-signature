/* eslint-disable react/prop-types */
import { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/cn'
import logoImage from '../../assets/logo.png'
import { navbarLinks } from '../../constants/index';

const Sidebar = forwardRef(({ collapsed }, ref) => {
    return (
        <aside
            ref={ref}
            className={cn(
                'fixed z-[100] flex h-full w-[300px] flex-col overflow-x-hidden shadow-lg bg-white [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1),_background-color_150ms_cubic-bezier(0.4,_0,_0.2,_1),_border_150ms_cubic-bezier(0.4,_0,_0.2,_1)] ',
                collapsed ? 'md:w-[100px] md:items-center ' : 'md:w-[320px]',
                collapsed ? 'max-md:-left-full' : 'max-md:left-0'
            )}>
            <div className='flex flex-col items-center justify-center p-4 h-[70px]'>
                <img src={logoImage} alt="doitung_logo" className='w-24' />
                {!collapsed && <p className='text-sm font-medium tracking-wider text-primary whitespace-nowrap'>Digital Signature System</p>}
            </div>
            <div className="flex w-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-3 px-4 [scrollbar-width:_thin]">
                {
                    navbarLinks.map((navbarLink, index) => (
                        <nav key={index} className={cn(
                            "sidebar-group",
                            collapsed && 'md:items-center'
                        )}>
                            {
                                navbarLink.links.map((link, index) => (
                                    <NavLink key={index} to={link.path} className={cn("sidebar-item", collapsed && "md:w-[45px]")}>
                                        <link.icon size={22} className="flex-shrink-0" />
                                        {
                                            !collapsed && <p className='whitespace-nowrap'>{link.label}</p>
                                        }
                                    </NavLink>
                                ))
                            }
                        </nav>
                    ))
                }
            </div>
        </aside>
    );
});

Sidebar.displayName = 'Sidebar';
export default Sidebar;