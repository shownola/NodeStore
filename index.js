const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <div>
      <form action="" method="POST">
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <input type="password" name="passwordConfirmation" placeholder="confirm password" />
        <button>Sign Up</button>
      </form>
    </div>
    `);
});

const bodyParser = (req, res, next) => {
  if(req.method === 'POST'){
    req.on('data', data => {
      const parsed = data.toString('utf8').split('&');
      const formData = {};
      for (let pair of parsed){
        const [key, value] = pair.split('=');
        formData[key] = value;
      }
      req.body = formData;
      next();
    });
  } else {
    next();
  }
};

app.post('/', bodyParser, (req, res) => {
  console.log(req.body);
  res.send('Account created!!');
});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});
