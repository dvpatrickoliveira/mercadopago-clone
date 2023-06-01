const React = require('react');
const PropTypes = require('prop-types');
const classNames = require('classnames');

const HubCard = require('../../../components/HubCard');

const Content = ({ hubcards, smsSender }) => (
  <div className="content">
    <div
      className={classNames('content__hubs', {
        'content__hubs-expand': smsSender,
      })}
    >
      {hubcards &&
        hubcards.map((hubcard) => <HubCard key={hubcard.title} {...hubcard} />)}
    </div>
  </div>
);

Content.propTypes = {
  hubcards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.shape({
        alt: PropTypes.string,
        png: PropTypes.string,
        webp: PropTypes.string,
      }),
      description: PropTypes.string,
      button: PropTypes.shape({
        text: PropTypes.string,
        href: PropTypes.string,
      }),
    })
  ),
  smsSender: PropTypes.bool,
};

Content.defaultProps = {
  hubcards: [],
  smsSender: false,
};

module.exports = Content;
