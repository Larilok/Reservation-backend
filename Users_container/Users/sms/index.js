const { google } = require('googleapis')

const identityToolkit = google.identitytoolkit({
  // TODO
  auth: 'GCP_API_KEY',
  version: 'v3'
})

const sendSMS = async data => {
  console.log('Send SMS ', data)
  try {
    const { phone, recaptcha_token } = data
    const response = await identityToolkit.relyingparty.sendVerificationCode({
      phone,
      recaptchaToken: recaptcha_token
    })
    // TODO
  } catch (err) {
    console.log(err)
  }
}

const validateSMSCode = async data => {
  console.log('validate SMS Code', data)
  try {
    const { phone, code } = data
    // TODO
    await identityToolkit.relyingparty.verifyPhoneNumber({
      code: code,
      sessionInfo: phoneSessionId
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  sendSMS,
  validateSMSCode
}
