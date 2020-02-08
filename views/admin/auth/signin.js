const layout = require('../layout');

const getError = (errors, prop) => {
  try {
    return errors.mapped()[prop].msg;
  } catch(err){
    return '';
  }
}

module.exports = ({ errors }) => {
  return layout({
    content: `
      <div>
        <form action="" method="POST">
          <input type="email" name="email" placeholder="email" />
          ${getError(errors, 'email')}
          <input type="password" name="password" placeholder="password" />
          ${getError(errors, 'password')}
          <button>Sign In</button>
        </form>
      </div>
      `
  });
};