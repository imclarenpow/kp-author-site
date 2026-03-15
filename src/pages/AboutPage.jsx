import './AboutPage.css'
import ExternalLink from '../components/links/ExternalLink'
import { aboutReviewLinks } from '../config/siteConfig'
import useImageFallback from '../hooks/useImageFallback'

const primaryHeadshotSrc = '/assets/BTRrev.jpg'
const fallbackHeadshotSrc = '/assets/img/covers/temp.png'

function AboutPage() {
    const { onError: handleHeadshotError } = useImageFallback(primaryHeadshotSrc, fallbackHeadshotSrc)

    return (
        <section className="page-container" id="about-content">
            <img
                id="about-headshot"
                src={primaryHeadshotSrc}
                alt="Photo of Keryn"
                loading="eager"
                decoding="async"
                onError={handleHeadshotError}
            />
            <div id="about-text">
                <h2>About Keryn</h2>
                <p>
                    Keryn writes for both young adults and adults.
                    Her first young adult novel, 'Before the Rising', publ. 2022, has a sequel brewing and another manuscript, 'Fight', was longlisted for the Laura Solomon Cuba Press Prize 2025. There is also a sequel underway for 'Fight'.
                    She also has recently completed a draft of the first in a planned adult crime series (working title 'Old Flames') set in small town New Zealand.
                    Keryn lives in Napier with her husband and an assortment of children and animals. When she's not working as a GP or writing, she enjoys reading, gardening, playing violin in a community orchestra, and avoiding housework.
                </p>

                <h3>Links to Reviews and Interviews</h3>
                <ul id="article-links">
                    {aboutReviewLinks.map((article) => (
                        <li key={article.href}>
                            <ExternalLink
                                className="link"
                                href={article.href}
                            >
                                {article.label}
                            </ExternalLink>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default AboutPage