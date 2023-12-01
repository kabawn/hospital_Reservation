// generateHash.js
const bcrypt = require('bcrypt');

const password = '4872021Okok*'; // Replace with the password you want to hash
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Your bcrypt hash:', hash);
});
