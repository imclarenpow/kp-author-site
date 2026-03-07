import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SiteFooter from '../components/layout/SiteFooter'
import SiteHeader from '../components/layout/SiteHeader'
import { pageTitles } from '../config/siteConfig'
import '../pages/page-shell.css'
import './SiteLayout.css'

function SiteLayout() {
    const location = useLocation()

    useEffect(() => {
        document.title = pageTitles[location.pathname] ?? 'Keryn Powell | Author'
    }, [location.pathname])

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