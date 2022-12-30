import React from 'react'
import PropTypes from 'prop-types'

function PageHeader({ text, style }) {
  return (
    <p className={`main-header-text ${style}`}>{text}</p>
  )
}

PageHeader.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.string,
}

PageHeader.defaultProps = {
  style: null
}

export default PageHeader