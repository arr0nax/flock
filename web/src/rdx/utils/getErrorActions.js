import actions from 'rdx/actions';

export default ({ error, target, message }) => {
  if (error.statusCode === 401 || error.text === 'Expired token' || error.text
=== 'Invalid credentials') {
    const unauthorizedErr = { text: 'Your session has expired, please log in again' };
    return actions.requestLogout()
  }
  const newErr = { ...error, target };
  if (message) newErr.message = message;
  return null;
};
