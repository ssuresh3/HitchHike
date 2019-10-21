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

function decrypt(password) {
    let iv = Buffer.from(password.iv, 'hex');
    let encryptedpassword = Buffer.from(password.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedpassword);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports = {

    encryptPasword: function(password){
        return encrypt(password)
    },

    decryptPassword: function(password){
        return decrypt(password)
    },

    varifyUser: function(email){
        console.log("varifying user given email: ", email)
    }

}

