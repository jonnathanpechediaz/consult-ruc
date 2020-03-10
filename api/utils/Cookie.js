class Cookie {
  constructor (req, res) {
    this.req = req;
    this.res = res;
    this.env = process.env.NODE_ENV;
  }

  create (domain, name, value) {
    this.res.cookie(name, value, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true, // http only, prevents JavaScript cookie access
      domain,
      secure: this.env !== 'development',
    });
  }
}

module.exports = Cookie;
