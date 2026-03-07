import { NavLink } from 'react-router-dom'
import './header-links.css'

function NavLinkItem({ to, children }) {
    const isRootRoute = to === '/'

    return (
        <NavLink
            to={to}
            end={isRootRoute}
            className={({ isActive }) =>
                `page-link header-link${isActive ? ' header-link-active' : ''}`
            }
        >
            {children}
        </NavLink>
    )
}

export default NavLinkItem
