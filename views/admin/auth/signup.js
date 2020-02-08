const layout = require('../layout');
const { getError } = require('../../helpers');


module.exports = ({ req, errors }) => {
  return layout({ content:
    `
      <div>
        Your id is${req.session.userId}
          <form action="" method="POST">
            <input type="email" name="email" placeholder="email" />
            ${getError(errors, 'email')}
            <input type="password" name="password" placeholder="password" />
            ${getError(errors, 'password')}
            <input type="password" name="passwordConfirmation" placeholder="confirm password" />
            ${getError(errors, 'passwordConfirmation')}
            <button>Sign Up</button>
          </form>
        </div>
    `
  });
};
