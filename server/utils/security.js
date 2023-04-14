const bcrypt = require('bcrypt');
const crypto = require('crypto');

const IV_LENGTH = 16; // For AES, this is always 16

const encrypt = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(process.env.PEPPER), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

const decrypt = (text) => {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(
    'aes-256-ctr',
    Buffer.from(process.env.PEPPER),
    iv,
  );
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};

const hashSHA512 = (text) =>
  crypto.createHash('sha512').update(text).digest('hex');

const hashBcrypt = async (text, salt) => {
  const hashedBcrypt = new Promise((resolve, reject) => {
    bcrypt.hash(text, salt, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
  return hashedBcrypt;
};

const compareBcrypt = async (data, hashed) => {
  const isCorrect = await new Promise((resolve, reject) => {
    bcrypt.compare(data, hashed, (err, same) => {
      if (err) reject(err);
      resolve(same);
    });
  });
  return isCorrect;
};

const generateSalt = () => bcrypt.genSaltSync(10);

const encryptPassword = async (password, salt) => {
  // Transform the plaintext password to hash value using SHA512
  const hashedSHA512 = hashSHA512(password);

  // Hash using bcrypt with a const of 10 and unique, per-user salt
  const hashedBcrypt = await hashBcrypt(hashedSHA512, salt);

  // Encrypt the resulting bcrypt hash with AES256
  const encryptAES256 = encrypt(hashedBcrypt);
  console.log(encryptAES256)

  const encryptedPassword = encryptAES256;
  return encryptedPassword;
};

const comparePassword = async (newPassWord, oldPassword) => {
  const isCorrectPassword = await compareBcrypt(
    hashSHA512(newPassWord),
    decrypt(oldPassword),
  );
  return isCorrectPassword;
};

module.exports = {
  generateSalt,
  encryptPassword,
  comparePassword,
};
