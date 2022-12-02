const Users = require('./Users.json');

const mockFindOne = (Instance, where) => {
  if (!where) {
    return Instance[0];
  }

  const whereFields = Object.keys(where);

  const result = Instance.filter(item => {
    const onlyMatch = whereFields.map( key => item[key] === where[key]);
    return onlyMatch.filter(v=>v).length === whereFields.length;
  });

  return result[0];
};

const mockCreate = (Instance, data) => {
  if (!data) {
    return;
  }

  const newData = data;
  if (Instance[0].id) {
    // A função Date.now() é utilizada apenas para gerar um valor que servirá como id
    newData.id = Date.now();
  }
  Instance.push(newData);
  return newData;
};

const User = {
  findAll: async () => Users,
  findOne: async ({ where }) => mockFindOne(Users, where),
  create: async (data) => mockCreate(Users, data),
};

module.exports = {
  User,
};
