exports.isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
  const ValidateEmail = (mail) => {
    if (re.test(mail)) {
      return true;
    }
    return (false);
  };
  if (!email) {
    return ({
      valid: false,
      reason: 'Please fill email field'
    });
  } if (email === '') {
    return ({
      valid: false,
      reason: 'Please insert email address'
    });
  } if (!ValidateEmail(email)) {
    return ({
      valid: false,
      reason: 'Invalid email format'
    });
  }
  return ({
    valid: true
  });
};

exports.isValidPassword = (password) => {
  if (!password) {
    return ({
      valid: false,
      reason: 'Please fill password field'
    });
  } if (password === '') {
    return ({
      valid: false,
      reason: 'Please input password'
    });
  } if (password.length < 8) {
    return ({
      valid: false,
      reason: 'Password length must be more than 8 characters'
    });
  }
  return ({
    valid: true
  });
};
exports.invalidString = str => typeof str === 'undefined' || str === '';

const numberHelper = x => typeof x === 'undefined' || x === '' || Number(x) < 0;
exports.invalidInteger = x => numberHelper(x) || !Number.isInteger(Number(x));
exports.invalidNumber = x => numberHelper(x) || Number.isNaN(Number(x));
