
const constants = {
  EXPIRATION_PERIOD: {
    SHORT: '10m',
    MEDIUM: '4h',
    LONG: '730h',
  },
  AUTH_STRATEGIES: {
    SESSION: 'jwt-with-session',
    OWNER: 'session-user-owns-item',
  },
};

module.exports = constants;
