const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  keys: ['asdf234asdf']
}));

app.get('/signup', (req, res) => {
  res.send(`
    <div>
    Your id is${req.session.userId}
      <form action="" method="POST">
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <input type="password" name="passwordConfirmation" placeholder="confirm password" />
        <button>Sign Up</button>
      </form>
    </div>
    `);
});


app.post('/signup', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  const existingUser = await usersRepo.getOneBy({ email });
  if(existingUser){
    return res.send('Email is taken');
  }
  if(password !== passwordConfirmation){
    return res.send('Passwords must match');
  }
  const user = await usersRepo.create({ email, password });
  // Store id of user inside the users cookie
  req.session.userId = user.id;

  res.send('Account created!!');
});

app.get('/signout', (req, res) => {
  req.session = null;
  res.send('You have logged out');
});

app.get('/signin', (req, res) => {
  res.send(`
    <div>
      <form action="" method="POST">
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button>Sign In</button>
      </form>
    </div>
    `)
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepo.getOneBy({ email });

  if(!user){
    return res.send('Email not found');
  }

  const validPassword = await usersRepo.comparePasswords(
    user.password,
    password
  );

  if(!validPassword){
    return res.send('Invalid password');
  }
  req.session.userId = user.id;

  res.send('You have signed in');


});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
