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
                    Keryn mainly writes YA fiction. She has been writing / scribbling /
                    journaling most of her life, but began to write more intentionally in 2016.
                    She lives in the beautiful Hawkes Bay with her husband, children, dog and
                    part time cat (his choice). When she is not writing she works as a GP.
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