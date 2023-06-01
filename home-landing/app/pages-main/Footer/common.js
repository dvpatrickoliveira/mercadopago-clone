/* istanbul ignore file */
const PropTypes = require('prop-types');

const LINK_TYPE = PropTypes.shape({
  text: PropTypes.string,
  href: PropTypes.string,
});

const IMAGE_TYPE = PropTypes.shape({
  alt: PropTypes.string,
  src: PropTypes.string,
  srcSet: PropTypes.string,
  sizes: PropTypes.string,
});

module.exports = { LINK_TYPE, IMAGE_TYPE };
