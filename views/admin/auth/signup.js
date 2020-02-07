module.exports = ({ req }) => {
  return `
  <div>
  Your id is${req.session.userId}
    <form action="" method="POST">
      <input type="email" name="email" placeholder="email" />
      <input type="password" name="password" placeholder="password" />
      <input type="password" name="passwordConfirmation" placeholder="confirm password" />
      <button>Sign Up</button>
    </form>
  </div>
  `
};
