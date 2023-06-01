/**
 * Module dependencies
 */
 const React = require('react');
 const ReactDOM = require('react-dom');
 
 /**
  * Nordic dependencies
  */
 const I18n = require('nordic/i18n');
 const I18nProvider = require('nordic/i18n/I18nProvider');
 
 /**
  * View
  */
 const View = require('../pages-main/main/view');
 
 /**
  * Get server state
  */
 const state = window.__PRELOADED_STATE__;
 
 /**
  * i18n
  */
 const i18n = new I18n({
   translations: state.translations,
 });
 
 /**
  * Mount View on client
  */
 ReactDOM.hydrate(
   <I18nProvider i18n={i18n}>
     <View {...state} />
   </I18nProvider>,
   document.getElementById('root-app')
 );
 