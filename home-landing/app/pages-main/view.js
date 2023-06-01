/**
 * Module dependencies
 */
 const React = require('react');
 const PropTypes = require('prop-types');
 const Style = require('nordic/style');
 const MeliGA = require('nordic/analytics/meli-ga');
 const MelidataTrack = require('nordic/melidata/melidata-track');
 const Script = require('nordic/script');
 const classNames = require('classnames');
 
 /**
  * landings-library Components
  */
 const Head = require('@landings-library/head');
 const {
   GTMScript,
   GTMNoScript,
 } = require('@landings-library/google-tag-manager');
 const {
   googleCaptcha: { SITE_KEY },
 } = require('../../constants');
 
 // AppContext
 const AppContext = require('../../AppContext');
 
 /**
  * Components
  */
 const Tracking = require('../../components/Tracking');
 const Konami = require('../../components/Konami');
 const Fonts = require('../../components/Fonts');
 const Hero = require('../../components/Hero');
 const Banner = require('../../components/Banner');
 const Content = require('./Content');
 const Footer = require('./Footer');
 const StickyButton = require('../../components/StickyButton');
 
 /**
  * View Component Using Page.
  */
 const View = ({
   siteId,
   contextData,
   GAdimensions,
   gtmId,
   head,
   sections,
   translations,
 }) => (
   <AppContext.Provider value={contextData}>
     <div
       id="mp-home"
       className={classNames(
         'mp-home',
         `mp-home--${siteId.toLowerCase()}`,
         { webp: contextData.browserSupportWebp },
         { 'no-webp': !contextData.browserSupportWebp }
       )}
     >
       <MeliGA section="HOME" page="INDEX" dimensions={GAdimensions} />
 
       <MelidataTrack path="/landing/home" />
 
       <GTMNoScript gtmId={gtmId} />
 
       <Head {...head} />
 
       <Style href={`critical.styles.${contextData.deviceType}.css`} inline />
       <Style
         href={`${siteId.toLowerCase()}.home.${contextData.deviceType}.css`}
       />
 
       <Fonts />
       {sections.banner && <Banner {...sections.banner} />}
       {sections.hero && <Hero {...sections.hero} />}
       {sections.content && <Content {...sections.content} />}
       {sections.footer && <Footer {...sections.footer} />}
       <StickyButton {...sections.stickybutton} />
 
       <Script>
         {`
           // preload state
           window.__PRELOADED_STATE__ = ${JSON.stringify({
             siteId,
             contextData,
             GAdimensions,
             gtmId,
             head,
             sections,
             translations,
           })};
 
           // aload.js
           function aload(t){"use strict";var e="data-aload";return t=t||window.document.querySelectorAll("["+e+"]"),
           void 0===t.length&&(t=[t]),[].forEach.call(t,function(t){t["LINK"!==t.tagName?"src":"href"]
           =t.getAttribute(e),t.removeAttribute(e)}),t}
           aload();
           `}
       </Script>
       {contextData.deviceType === 'desktop' && (
         <Script>
           {`
               // google captcha
               function loadCaptchaScript() {
                 var captchaScript = document.createElement('script');
                 captchaScript.src="https://www.google.com/recaptcha/enterprise.js?render=${SITE_KEY}";
                 captchaScript.setAttribute("defer", "defer");
                 captchaScript.setAttribute("async", "async");
                 document.body.appendChild(captchaScript);
               }
               loadCaptchaScript();
               `}
         </Script>
       )}
       <Tracking />
       <Konami />
       <GTMScript gtmId={gtmId} />
       {contextData.deviceType === 'desktop' && (
         <>
           <Script src="vendor.js" />
           <Script
             src={`${siteId.toLowerCase()}.home.${contextData.deviceType}.js`}
           />
         </>
       )}
     </div>
   </AppContext.Provider>
 );
 
 View.propTypes = {
   siteId: PropTypes.string.isRequired,
   contextData: PropTypes.shape({
     deviceType: PropTypes.string,
     deviceLowEnd: PropTypes.bool,
     browserSupportWebp: PropTypes.bool,
   }).isRequired,
   GAdimensions: PropTypes.shape({}),
   gtmId: PropTypes.string.isRequired,
   head: PropTypes.shape({}).isRequired,
   sections: PropTypes.shape({
     banner: PropTypes.shape({}),
     hero: PropTypes.shape({}),
     content: PropTypes.shape({}),
     footer: PropTypes.shape({}),
     incentive: PropTypes.shape({}),
     stickybutton: PropTypes.shape({}),
   }),
   translations: PropTypes.shape({}).isRequired,
 };
 
 View.defaultProps = {
   GAdimensions: {},
   sections: {
     hero: {
       title: 'Título',
       description: 'Descripción',
     },
   },
 };
 
 /**
  * View.
  */
 module.exports = View;
 