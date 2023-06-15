const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const regex = (options, input) => {
    if (options == "dept_no") {
        const regex = /^[A-Z]{3}[0-9]{0,5}$$/;
        const isMatch = regex.test(input);
        return isMatch

    } else if (options == "dept_name") {
        const regex = /^[a-zA-Z]+$/;
        const isMatch = regex.test(input);
        return isMatch
        
    } else if (options == "username"){
        const regex = /^[a-zA-Z0-9]{4,}$/;
        const isMatch = regex.test(input);
        return isMatch

    } else if (options == "password") {
        const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        const isMatch = regex.test(input);
        return isMatch
    }

    return null
}

const comparePasswords = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
}

const generateToken = (payload, secretKey, expiresIn) => {
  return jwt.sign(payload, secretKey, { expiresIn });
}

const setTimes = (number, unit) => {
  if (unit == "m"){
    let times = new Date(Date.now() + number * 60 * 1000)
    let stingTime = `${number}m`
    return { times, stingTime }

  } else if (unit == "h") {
    let times = new Date(Date.now() + number * 60 * 60 * 1000)
    let stingTime = `${number}m`
    return { times, stingTime }

  } else if (unit == "d") {
    let times = new Date(Date.now() + number * 24 * 60 * 60 * 1000)
    let stingTime = `${number}m`
    return { times, stingTime }

  }
  return null, null
}

module.exports = { regex, comparePasswords, generateToken, setTimes }