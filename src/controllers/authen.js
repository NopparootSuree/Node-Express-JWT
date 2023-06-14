const { validationResult } = require('express-validator');
const db = require('../configs/database');
const { regex, comparePasswords, generateToken } = require('../configs/config')
const bcrypt = require('bcryptjs')
const { format } = require('date-fns');
require('dotenv').config();

const registerUsers = async (req, res) => {
	const errors = validationResult(req)

	if(!errors.isEmpty()){
		return res.status(500).json({ errors: errors.array() })
	}

    try {
	    const { username, password, email } = req.body
        const currentDate = new Date();
        const formattedDate = format(currentDate, 'yyyy-MM-dd');
        
        const usernameExists = await db('users').where('username', username).first();
        const userEmainExists = await db('users').where('email', email).first();
        
        if (usernameExists != null || userEmainExists != null) {
            throw new Error('User or Email already takken');
        }

        const isMatch_username = regex("username", username)
        console.log(isMatch_username);
        const isMatch_password = regex("password", password)
        console.log(isMatch_password);

        if (isMatch_username != true) {
            throw new Error("Username must consist of alphabetic characters (uppercase or lowercase), numbers 0-9, and have a minimum length of 4 characters.")
        }

        if (isMatch_password != true) {
            throw new Error("The password must contain at least 1 uppercase letter, 1 digit, and be at least 8 characters long.")
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        db('users')
            .insert({  
                username: username, 
                password: hashedPassword, 
                email: email,
                createdAt: formattedDate})
            .then(() => {
                res.status(201).json({ message: 'User created successfully' });
            })
            .catch((error) => {
                res.status(500).json({ message: 'Failed to create user', error });
            })

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
    
}

const login = async (req, res) => {
    const { username, password } = req.body;
  
    const user = await db('users').where('username', username).first();

    if (!user) {
      return res.status(404).json({ error: 'Record is not found' });
    }
  
    const isPasswordCorrect = await comparePasswords(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Login failed' });
    }
  
    // สร้าง secretKey
    const secretKey = process.env.JWT_SECRET_KEY;
  
    // ปรับแต่ง claims
    const claims = {
      username: user.username,
      algorithm: 'HS256', // อัลกอริทึมในการเข้ารหัส JWT
      expiresIn: '3h', // ระยะเวลาหมดอายุของ JWT
    };
  
    // สร้าง Token
    const token = generateToken(claims, secretKey, '3h');
  
    const payload = {
      token,
      username: user.username,
      issuedAt: new Date(),
      expiredAt: new Date(Date.now() + 3 * 60 * 60 * 1000), // หมดอายุใน 3 ชั่วโมง
    };
  
    res.status(200).json({ payload });
}

module.exports = { registerUsers, login };