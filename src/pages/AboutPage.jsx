import './AboutPage.css'

const primaryHeadshotSrc = '/assets/BTRrev.jpg'
const fallbackHeadshotSrc = '/assets/img/covers/temp.png'

function handleHeadshotError(event) {
    const image = event.currentTarget

    if (!image.dataset.retry) {
        image.dataset.retry = 'true'
        image.src = `${primaryHeadshotSrc}?retry=${Date.now()}`
        return
    }

    image.onerror = null
    image.src = fallbackHeadshotSrc
}

function AboutPage() {
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
                    <li>
                        <a
                            className="link"
                            href="https://www.nzdoctor.co.nz/article/gp-and-novelist-career-stories"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            NZ Doctor Article: "GP and novelist: A career of stories"
                        </a>
                    </li>
                    <li>
                        <a
                            className="link"
                            href="https://www.nzherald.co.nz/hawkes-bay-today/news/author-explores-different-end-to-legend/JCOW3AH4V4Y373VCWG3EYHFCLA/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Hawkes Bay Today: "Author Explores different end to legend"
                        </a>
                    </li>
                    <li>
                        <a
                            className="link"
                            href="https://www.nzherald.co.nz/hawkes-bay-today/news/book-review-before-the-rising-by-keryn-powell/TOPMGX3OYFJHYTGI3P25KBSWZU/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Hawkes Bay Today: "Book review: Before the Rising by Keryn Powell"
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default AboutPage