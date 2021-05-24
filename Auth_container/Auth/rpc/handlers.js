
const argon2 = require('argon2')
const { getPassword } = require('../db/queries')

const TOKEN_LENGTH = 80;
const ALPHA_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ALPHA_LOWER = 'abcdefghijklmnopqrstuvwxyz';
const ALPHA = ALPHA_UPPER + ALPHA_LOWER;
const DIGIT = '0123456789';
const ALPHA_DIGIT = ALPHA + DIGIT;

const FAKE_ARGON2 = '$argon2i$v=19$m=4096,t=3,p=1$P7WDeMgGqZikuTLIh2p9vA$6w9CAQpiMCx7CLLhrftHjkP66OVZjuYuVprbm2znUeo'
const VERSION = 1

const generateToken = () => {
  const base = ALPHA_DIGIT.length;
  let key = '';
  for (let i = 0; i < TOKEN_LENGTH; i++) {
    const index = Math.floor(Math.random() * base);
    key += ALPHA_DIGIT[index];
  }
  return key;
};

const login = async (call, callback) => {
  console.log(call.request)
  const { email, password } = call.request
  const userPassword = (await getPassword({ email }))

  console.log('User password', userPassword)
  try {
    if (!userPassword) {
      console.log('Wrong login')
      //timebase attacks protection
      await argon2.verify(FAKE_ARGON2, stringToArray(password))

      callback('Login or password is incorrect')
    }

    if (!await argon2.verify(userPassword, stringToArray(password))) {
      console.log('Wrong password')
      callback('Login or password is incorrect')
      return
    }
  } catch (err) {
    console.log(err)
  }

  callback(null, { token: generateToken() })
}

const signup = async (call, callback) => {
  try {
    const { email, password } = call.request
    const userPassword = await getPassword({ email })
    if (userPassword) {
      callback('User already exists')
      return
    }
    const hashedPassword = await argon2.hash(stringToArray(password))

    callback(null, { password: hashedPassword })
  }
  catch (err) {
    console.log(err)
  }
}

const stringToArray = (str) => {
  const array = str.split(',').map(v => Number(v))
  return Buffer.from(array)
}

module.exports = {
  login,
  signup
}
