const request = require('request');
const { successResponse, errorResponse } = require('../utils/response');

class RucController {
  constructor (req, res) {
    this.req = req;
    this.res = res;
    this.apiURL = process.env.API_URL;
    this.env = process.env.NODE_ENV;
  }

  async run () {
    try {
      const response = await this.getRUC(this.req.body.search);
      console.log(response);
      if (response) {
        return this.res.send(successResponse(response, ''));
      }
      /*
      if (response.state === 'success') {
        // console.log('session', response.session);
        this.coockie.create(getDomain(this.req), 'marathon', response.session);
        return this.res.send(successResponse(response.data, ''));
      }
       */

      this.res.send(successResponse(null, 'Not data', false));
    } catch (error) {
      console.log(error);
      this.res.status(500)
        .send(errorResponse('Error interno'));
    }
  }

  async getRUC (ruc) {
    const url = this.apiURL + '&ruc=' + ruc + '&token=' + 'cXdlcnR5bGFtYXJja19zYUBob3RtYWIsLmNvbXF3ZXJ0eQ==';
    return new Promise(async (resolve, reject) => {
      // console.log('body_request', body);
      await request.get(
        {
          url,
          // form: body,
          json: true,
        }, async (err, httpResponse, response) => {
          if (err) {
            console.log('err', err);
            await reject(err);
          } else {
            console.log('response', response);
            await resolve(response);
          }
        });
    });
  }
}
module.exports = RucController;
