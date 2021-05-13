const express = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const refresh = require('../middleware/refresh');
const router = express.Router();

const User = require('../models/User');

// route        GET api/auth
// desc         Get Logged in user
// access       Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// route        POST api/auth
// desc         Auth User and Get Token
// access       Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'User Not Registered.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Wrong Password.' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 30,
      });

      const rtoken = jwt.sign(payload, config.get('refreshSecret'), {
        expiresIn: 120,
      });

      res.json({ token, rtoken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/refresh',refresh,async (req,res)=>{
  try {
    const payload = {
      user: {
        id: req.user.id,
      },
    };

    const token = jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 30,
    });

    const rtoken = jwt.sign(payload, config.get('refreshSecret'), {
      expiresIn: 120,
    });

    res.json({ token, rtoken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;
