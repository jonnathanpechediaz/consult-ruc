const { Router } = require('express');
const router = Router();
const LoginController = require('./controllers/LoginController');
const RucController = require('./controllers/RucController');

// Login
router.post('/login', async (req, res) => {
  console.log('init ...');
  console.log(req.body);
  const loginController = new LoginController(req, res);
  await loginController.run();
  console.log('end...');
});

// Login
router.post('/ruc', async (req, res) => {
  console.log('init ...');
  console.log(req.body);
  const rucController = new RucController(req, res);
  await rucController.run();
  console.log('end...');
});

module.exports = router;
