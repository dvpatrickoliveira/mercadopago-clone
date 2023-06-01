/* eslint-disable react/no-danger */
const React = require('react');
const PropTypes = require('prop-types');
const appContext = require('../../../AppContext');
const { LINK_TYPE, IMAGE_TYPE } = require('./common');

const Ssn = require('./components/Ssn');
const Pnfc = require('./components/Pnfc');

const Footer = ({
  legalDisclaimer,
  regretPolicy,
  regretPolicyLink,
  pnfc,
  legalDisclaimerBCRA,
  ssn,
}) => {
  const { siteId, deviceType } = React.useContext(appContext);

  const legalFooter = {
    __html: legalDisclaimer,
  };

  const renderDisclaimers = () => {
    const isMobile = deviceType === 'mobile';

    if (siteId !== 'MLA') {
      return (
        <>
          {pnfc && (
            <>
              <div className="footer__separator" />
              <Pnfc pnfc={pnfc} />
            </>
          )}
          {ssn && (
            <>
              <div className="footer__separator" />
              <Ssn ssn={ssn} data-testid="ssn-container" />
            </>
          )}
        </>
      );
    }
    return (
      <div
        className="footer__disclaimers-wrapper"
        data-testid="disclaimers-wrapper"
      >
        {pnfc && (
          <>
            {isMobile && <div className="footer__separator" />}
            <Pnfc pnfc={pnfc} />
            <div className="footer__separator" />
          </>
        )}
        {ssn && <Ssn ssn={ssn} />}
      </div>
    );
  };

  return (
    <footer role="contentinfo" className="footer">
      {legalDisclaimerBCRA && (
        <div className="footer__content-container footer__content-legal-disclaimer">
          <p>{legalDisclaimerBCRA}</p>
        </div>
      )}
      <div className="footer__content-container">
        <p className="footer__content" dangerouslySetInnerHTML={legalFooter} />
        {regretPolicy && (
          <p className="footer__content footer__regret-policy">
            {regretPolicy}.&nbsp;
            <a href={regretPolicyLink.href}>{regretPolicyLink.text}</a>
          </p>
        )}
        {renderDisclaimers()}
      </div>
    </footer>
  );
};

Footer.defaultProps = {
  regretPolicy: '',
  regretPolicyLink: {},
  pnfc: null,
};

Footer.propTypes = {
  legalDisclaimer: PropTypes.string.isRequired,
  regretPolicy: PropTypes.string,
  regretPolicyLink: LINK_TYPE,
  legalDisclaimerBCRA: PropTypes.string,
  pnfc: PropTypes.shape({
    mpLink: LINK_TYPE,
    bcraLink: PropTypes.shape({
      image: IMAGE_TYPE,
      href: PropTypes.string,
    }),
  }),
  ssn: PropTypes.shape({
    mpLink: LINK_TYPE,
    ssnLink: PropTypes.shape({
      image: IMAGE_TYPE,
      href: PropTypes.string,
    }),
  }),
};

module.exports = Footer;
