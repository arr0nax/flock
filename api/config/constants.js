
const constants = {
  EXPIRATION_PERIOD: {
    INSTANT: '20s',
    SHORT: '10m',
    MEDIUM: '4h',
    LONG: '730h',
  },
  AUTH_STRATEGIES: {
    SESSION: 'jwt-with-session',
    OWNER: 'session-user-owns-item',
    ADMIN: 'user-is-admin',
  },
};

module.exports = constants;
