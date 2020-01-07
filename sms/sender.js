const config = require("config");
const options = config.get("options");
const AfricasTlk = require("africastalking")(options);
class SMS {
  static sendSms(name, phone, comments) {
    const smsObj = AfricasTlk.SMS;

    const sms = {
      to: ["+254716904375"],
      message: `${name},${phone} said ${comments}`
    };

    smsObj
      .send(sms)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = SMS;
