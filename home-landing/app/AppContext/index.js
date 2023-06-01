const { createContext } = require('react');

const config = {
  deviceType: 'desktop',
  deviceLowEnd: false,
  browserSupportWebp: false,
};

const Context = createContext({ config });

module.exports = Context;
