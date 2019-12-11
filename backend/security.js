// security module

// to do: add salting method

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(password) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(password);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

module.exports = {

    encryptPasword: function (password) {
        return encrypt(password)
    },

    varifyUser: function (email) {
        console.log("varifying user given email: ", email)
    },

    updatePasswork: function (email, oldP, newP) {
        console.log("updating password, make user varify email")
    },
}

