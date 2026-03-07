import './NewsPage.css'

function NewsPage() {
    return (
        <section className="page-container news-page-container">
            <div id="mc_embed_shell">
                <div id="mc_embed_signup">
                    <form
                        action="https://keryn-powell-author.us16.list-manage.com/subscribe/post?u=efd4d433b486f1a96d074cef8&amp;id=5ea16d2851&amp;f_id=00dec2e1f0"
                        method="post"
                        id="mc-embedded-subscribe-form"
                        name="mc-embedded-subscribe-form"
                        className="validate"
                        target="_self"
                        noValidate
                    >
                        <div id="mc_embed_signup_scroll">
                            <h3>Newsletter Sign-Up</h3>

                            <div className="indicates-required">
                                <span className="asterisk">*</span> indicates required
                            </div>

                            <div className="mc-field-group">
                                <label htmlFor="mce-EMAIL">
                                    Email Address <span className="asterisk">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="EMAIL"
                                    className="required email"
                                    id="mce-EMAIL"
                                    required
                                    defaultValue=""
                                />
                            </div>

                            <div className="mc-field-group">
                                <label htmlFor="mce-FNAME">First Name </label>
                                <input
                                    type="text"
                                    name="FNAME"
                                    className="text"
                                    id="mce-FNAME"
                                    defaultValue=""
                                />
                                <span id="mce-FNAME-HELPERTEXT" className="helper_text">
                                    Optional
                                </span>
                            </div>

                            <div id="mce-responses" className="clear foot">
                                <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
                                <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
                            </div>

                            <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
                                {/* Honeypot field for bot signups. */}
                                <input
                                    type="text"
                                    name="b_efd4d433b486f1a96d074cef8_5ea16d2851"
                                    tabIndex="-1"
                                    defaultValue=""
                                />
                            </div>

                            <div className="optionalParent">
                                <div className="clear foot">
                                    <input
                                        type="submit"
                                        name="subscribe"
                                        id="mc-embedded-subscribe"
                                        className="button"
                                        value="Subscribe"
                                    />

                                    <p style={{ margin: '0px auto' }}>
                                        <a
                                            href="http://eepurl.com/i6SKOw"
                                            title="Mailchimp - email marketing made easy and fun"
                                        >
                                            <span
                                                style={{
                                                    display: 'inline-block',
                                                    backgroundColor: 'transparent',
                                                    borderRadius: '4px',
                                                }}
                                            >
                                                <img
                                                    className="refferal_badge"
                                                    src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg"
                                                    alt="Intuit Mailchimp"
                                                    style={{
                                                        width: '220px',
                                                        height: '40px',
                                                        display: 'flex',
                                                        padding: '2px 0px',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                />
                                            </span>
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default NewsPage