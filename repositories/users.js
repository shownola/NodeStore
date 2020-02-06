const fs     = require('fs');
const crypto = require('crypto');

class UsersRepository {
  constructor(filename){
    if(!filename){
      throw new Error('A filename is required to create repository');
    }
    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch(err){
      fs.writeFileSync(this.filename, '[]');
    }

  }
  async getAll(){
    // Open the file called this.filename
    return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8' }));
  }

  async create(attrs){
    attrs.id = this.randomId();
    const records = await this.getAll();
    records.push(attrs);
    await this.writeAll(records);
  }

  async writeAll(records){
    await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
  }

  randomId(){
    return crypto.randomBytes(4).toString('hex');
  }

  async getOne(id){
    const records = await this.getAll();
    return records.find(record => record.id === id);
  }

  async delete(id){
    const records = await this.getAll();
    const filteredRecords = records.filter(record => record.id !== id);
    await this.writeAll(filteredRecords);
  }
}



const test = async () => {
  const repo = new UsersRepository('users.json');
  await repo.create({ email: 'test@test.com', password: 'password' });
  const users = await repo.getAll();
  // const user = await repo.getOne('12e8dd22');
  console.log(user);
  // await repo.delete('12e8dd22');
};

test();
