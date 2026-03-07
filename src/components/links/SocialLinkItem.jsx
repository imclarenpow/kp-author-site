import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './header-links.css'

const socialIconsByName = {
    facebook: faFacebook,
    instagram: faInstagram,
}

function SocialLinkItem({ href, iconName, label }) {
    const icon = socialIconsByName[iconName]

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link header-link"
            aria-label={label}
        >
            {icon ? <FontAwesomeIcon icon={icon} /> : null}
        </a>
    )
}

export default SocialLinkItem
