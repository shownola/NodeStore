const fs     = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {

  async comparePasswords(saved, supplied){
    // saved: saved in db
    //Supplied: password given by user signing in
    const [hashed, salt] = saved.split('.');
    const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

    return hashed === hashedSuppliedBuf.toString('hex');
  }

  async create(attrs){
    attrs.id = this.randomId();

    const salt = crypto.randomBytes(8).toString('hex');
    const buf = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();
    const record = {
      ...attrs,
      password: `${buf.toString('hex')}.${salt}`
    }
    records.push(record);

    await this.writeAll(records);
    return record;
  }
}

module.exports = new UsersRepository('users.json');

// const test = async () => {
//   const repo = new UsersRepository('users.json');
//   // await repo.create({ email: 'test@test.com', password: 'password' });
//   const users = await repo.getAll();
//   const user = await repo.getOne('f1aec9d1');
//   console.log(user);
//   await repo.delete('f1aec9d1');
//   // await repo.update('9f8454cd', { password: 'mypassword' });
//   // const user = await repo.getOneBy({ email: 'test@test.com', password: 'mypassword' });
//   // console.log(user);
// };
//
// test();
