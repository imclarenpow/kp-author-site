import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <section className="page-container page-stack">
            <h2 className="page-title">Page Not Found</h2>
            <p className="page-lead">The page you requested does not exist.</p>
            <p className="page-lead">
                <Link className="page-link-inline" to="/">
                    Return to Home
                </Link>
            </p>
        </section>
    )
}

export default NotFoundPage