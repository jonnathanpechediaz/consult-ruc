const request = require('request');
const bcrypt = require('bcrypt');
const db = require('../models');
const Cookie = require('../utils/Cookie');
const { getDomain } = require('../utils/helpers');
const { successResponse, errorResponse } = require('../utils/response');
const User = db.users;
const Op = db.Sequelize.Op;

class LoginController {
  constructor (req, res) {
    this.req = req;
    this.res = res;
    this.coockie = new Cookie(req, res);
    this.apiURL = process.env.API_URL;
    this.env = process.env.NODE_ENV;
  }

  async run () {
    try {
      const response = await this.processLogin(this.req.body.email, this.req.body.password);
      if (response) {
        // this.coockie.create(getDomain(this.req), 'marathonAuth', response.session);
        return this.res.send(successResponse(response, ''));
      }

      this.res.send(successResponse(null, 'Credenciales incorrectas', false));
    } catch (error) {
      console.log(error);
      this.res.status(500)
        .send(errorResponse('Error interno'));
    }
  }

  async hashPassword (user) {
    const password = user.password;
    const saltRounds = 10;

    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) { reject(err); }
        resolve(hash);
      });
    });

    return hashedPassword;
  }

  bcryptPass (password) {
    const BCRYPT_SALT_ROUNDS = 10;
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
      .then(function (hashedPassword) {
        console.log('hashedPassword', hashedPassword);
        return hashedPassword;
      });
  }

  async processLogin (email, password) {
    const userdata = await User
      .findOne({
        attributes: ['id', 'name', 'email'],
        where: {
          email,
          password,
        },
      });

    console.log('userdata', userdata);
    return userdata;
  }
}

module.exports = LoginController;
