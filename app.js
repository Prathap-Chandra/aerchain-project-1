const express = require('express');
const app = express();

app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(express.json({ limit: '5mb', extended: true }));


app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  
  res.header('Strict-Transport-Security', 'maxAge=100000');
  res.header('X-Frame-Options', 'DENY');
  res.header('Content-Security-Policy', "frame-ancestors 'none'");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Cookies, cookies, x-access-token, Origin, Content-Type, Accept');

  return next();
});

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'hello'
  });
})

module.exports = app;