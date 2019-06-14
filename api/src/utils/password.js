const bcrypt = require('bcryptjs');

function generatePassword(pw) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(pw, salt);
  return hash;
}

module.exports = {
  generatePassword
};
