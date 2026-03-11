import { Outlet, useLocation } from 'react-router-dom'
import SiteFooter from '../components/layout/SiteFooter'
import SiteHeader from '../components/layout/SiteHeader'
import useSiteMetadata from '../hooks/useSiteMetadata'
import './SiteLayout.css'

function SiteLayout() {
    const location = useLocation()
    useSiteMetadata(location.pathname)

    return (
        <div className="site-shell">
            <SiteHeader />
            <main className="site-main">
                <Outlet />
            </main>
            <SiteFooter />
        </div>
    )
}

export default SiteLayout