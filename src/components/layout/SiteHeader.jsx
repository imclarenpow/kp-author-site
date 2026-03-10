import NavLinkItem from '../links/NavLinkItem'
import SocialLinkItem from '../links/SocialLinkItem'
import { primaryNavLinks, siteMeta, socialLinks } from '../../config/siteConfig'
import './SiteHeader.css'

const headerLogoMaskStyle = {
    '--site-logo-mask': `url("${siteMeta.logoSrc}")`,
}

function SiteHeader() {
    const { logoAlt, logoSrc, siteTitle } = siteMeta

    return (
        <header className="site-header">
            <div className="site-header-brand">
                <div className="site-header-logo-wrap" style={headerLogoMaskStyle}>
                    <img className="site-header-logo" src={logoSrc} alt={logoAlt} />
                    <span className="site-header-logo-tint" aria-hidden="true"></span>
                </div>

                <h1 className="site-header-title" data-title={siteTitle}>
                    {siteTitle}
                </h1>
            </div>

            <div className="site-navbar">
                <div className="site-navbar-spacer" aria-hidden="true"></div>

                <nav className="pages nav-links" aria-label="Primary">
                    {primaryNavLinks.map((link) => (
                        <NavLinkItem key={link.to} to={link.to}>
                            {link.label}
                        </NavLinkItem>
                    ))}
                </nav>

                <nav className="social nav-links" aria-label="Social links">
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