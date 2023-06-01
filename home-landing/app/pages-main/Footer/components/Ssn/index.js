const React = require('react');
const PropTypes = require('prop-types');
const ImageWrapper = require('../../../../../components/ImageWrapper');
const { LINK_TYPE, IMAGE_TYPE } = require('../../common');

const Ssn = ({ ssn }) => (
  <div className="footer__pnfc-wrapper" data-testid="ssn-container">
    <p className="footer__content footer__pnfc-text-link">
      <a href={ssn.mpLink.href}>{ssn.mpLink.text}</a>
    </p>
    <a
      href={ssn.ssnLink.href}
      target="_blanck"
      className="footer__pnfc-image-link"
    >
      <ImageWrapper
        className="footer__ssn-link-image"
        alt={ssn.ssnLink.image.alt}
        src={ssn.ssnLink.image.src}
        srcSet={ssn.ssnLink.image.srcSet}
        sizes={ssn.ssnLink.image.sizes}
      />
    </a>
  </div>
);

Ssn.propTypes = {
  ssn: PropTypes.shape({
    mpLink: LINK_TYPE,
    ssnLink: PropTypes.shape({
      image: IMAGE_TYPE,
      href: PropTypes.string,
    }),
  }),
};

module.exports = Ssn;
