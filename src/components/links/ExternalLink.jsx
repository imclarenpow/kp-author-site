function ExternalLink({ target = '_blank', rel = 'noopener noreferrer', ...props }) {
    return <a target={target} rel={rel} {...props} />
}

export default ExternalLink