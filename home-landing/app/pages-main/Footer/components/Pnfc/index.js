const React = require('react');
const PropTypes = require('prop-types');
const ImageWrapper = require('../../../../../components/ImageWrapper');
const { LINK_TYPE, IMAGE_TYPE } = require('../../common');

const Pnfc = ({ pnfc }) => (
  <div className="footer__pnfc-wrapper" data-testid="pnfc-container">
    <p className="footer__content footer__pnfc-text-link">
      <a href={pnfc.mpLink.href}>{pnfc.mpLink.text}</a>
    </p>
    <a
      href={pnfc.bcraLink.href}
      target="_blanck"
      className="footer__pnfc-image-link"
    >
      <ImageWrapper
        className="footer__pnfc-link-image"
        alt={pnfc.bcraLink.image.alt}
        src={pnfc.bcraLink.image.src}
        srcSet={pnfc.bcraLink.image.srcSet}
        sizes={pnfc.bcraLink.image.sizes}
      />
    </a>
  </div>
);

Pnfc.propTypes = {
  pnfc: PropTypes.shape({
    mpLink: LINK_TYPE,
    bcraLink: PropTypes.shape({
      image: IMAGE_TYPE,
      href: PropTypes.string,
    }),
  }),
};

module.exports = Pnfc;
