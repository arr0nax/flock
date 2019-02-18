import User from '../models/user';
import Role from '../models/role';
import Boom from 'boom';

const isAdmin = async function(request, h) {
  try {
    // return h.continue;
    console.log('user_id', request.auth.credentials.user_id);
    const role = await User.getRole(request.auth.credentials.user_id);
    console.log('role', role);
    if (role && role.attributes.name === 'admin') {
      return h.continue;
    }
    return Boom.forbidden('You must be an admin to do this');
  } catch (err) {
    return Boom.forbidden(err.message);
  }
};

isAdmin.applyPoint = 'onPreHandler';

module.exports = isAdmin;
