import {
    faFacebook,
    faGithub,
    faInstagram,
    faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ExternalLink from './ExternalLink'
import './header-links.css'

const socialIconsByName = {
    facebook: faFacebook,
    github: faGithub,
    instagram: faInstagram,
    linkedin: faLinkedinIn,
}

function SocialLinkItem({ href, iconName, label }) {
    const icon = socialIconsByName[iconName]

    return (
        <ExternalLink
            href={href}
            className="social-link header-link"
            aria-label={label}
        >
            {icon ? <FontAwesomeIcon icon={icon} /> : null}
        </ExternalLink>
    )
}

export default SocialLinkItem
