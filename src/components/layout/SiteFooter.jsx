import SocialLinkItem from '../links/SocialLinkItem'
import { footerSocialLinks, siteMeta } from '../../config/siteConfig'
import './SiteFooter.css'

function SiteFooter() {
    return (
        <footer className="site-footer">
            <p>Site By {siteMeta.footerCreditName}</p>

            <nav className="site-footer-social" aria-label="Developer links">
                {footerSocialLinks.map((link) => (
                    <SocialLinkItem
                        key={link.href}
                        href={link.href}
                        iconName={link.iconName}
                        label={link.label}
                    />
                ))}
            </nav>
        </footer>
    )
}

export default SiteFooter