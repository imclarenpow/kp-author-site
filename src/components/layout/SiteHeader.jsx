import NavLinkItem from '../links/NavLinkItem'
import SocialLinkItem from '../links/SocialLinkItem'
import { primaryNavLinks, siteMeta, socialLinks } from '../../config/siteConfig'
import './SiteHeader.css'

function SiteHeader() {
    return (
        <header className="site-header">
            <img className="site-header-logo" src={siteMeta.logoSrc} alt={siteMeta.logoAlt} />
            <h1 className="site-header-title">{siteMeta.siteTitle}</h1>

            <div className="site-navbar">
                <div className="site-navbar-spacer" aria-hidden="true"></div>

                <nav className="pages nav-links" aria-label="Primary">
                    {primaryNavLinks.map((link) => (
                        <NavLinkItem key={link.to} to={link.to}>
                            {link.label}
                        </NavLinkItem>
                    ))}
                </nav>

                <nav className="social nav-links" aria-label="Social">
                    {socialLinks.map((link) => (
                        <SocialLinkItem
                            key={link.href}
                            href={link.href}
                            iconName={link.iconName}
                            label={link.label}
                        />
                    ))}
                </nav>
            </div>
        </header>
    )
}

export default SiteHeader