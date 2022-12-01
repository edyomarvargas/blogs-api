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

const User = {
  findOne: async ({ where }) => mockFindOne(Users, where),
};

module.exports = {
  User,
};
