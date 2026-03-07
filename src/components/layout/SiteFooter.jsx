import { siteMeta } from '../../config/siteConfig'
import './SiteFooter.css'

function SiteFooter() {
    return (
        <footer className="site-footer">
            <p>
                Site By:{' '}
                <a href={siteMeta.footerCreditUrl} target="_blank" rel="noopener noreferrer">
                    {siteMeta.footerCreditName}
                </a>
            </p>
        </footer>
    )
}

export default SiteFooter