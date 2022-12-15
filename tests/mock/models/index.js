const Users = require('./Users.json');
const Categories = require('./Categories.json');
const BlogPosts = require('./Posts.json');

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

const mockFindByPk = (Instance, id) => {
  const result = Instance.find((instance) => instance.id === Number(id));
  if(!result) return null;

  const resultWithoutPassword = {
    ...result,
  }
  delete resultWithoutPassword.password;

  return resultWithoutPassword;
};

const mockDestroy = (Instance, where) => {
  if (!where) {
    return Instance[0];
  }

  if (where.id) {
    where.id = Number(where.id);
  }

  const options = Object.keys(where);
  const result = Instance.find((instance) => {
    return options.every((option) => where[option] === instance[option]);
  });

  if(!result) return null;
  return result;
}

const mockUpdate = (Instance, fields, { where }) => {
  if (!where) return Instance[0];

  if (where.id) {
    where.id = Number(where.id);
  } 

  const options = Object.keys(where);
  const result = Instance.find((instance) => {
    return options.every((option) => where[option] === instance[option]);
  });
  if(!result) return null;

  const editFields = Object.keys(fields);
  editFields.forEach((field) => result[field] = fields[field]);
  return result;
};

const mockSearch = (Instance, query) => {
  if (!query) return Instance;

  const result = Instance.filter((instance) => {
    const { title, content } = instance;
    return title.includes(query) || content.includes(query);
  });
  return result;
};

const User = {
  findAll: async () => Users,
  findOne: async ({ where }) => mockFindOne(Users, where),
  findByPk: async (id) => mockFindByPk(Users, id),
  create: async (data) => mockCreate(Users, data),
  destroy: async({ where }) => mockDestroy(Users, where),
};

const Category = {
  findAll: async () => Categories,
  create: async (data) => mockCreate(Categories, data),
}

const BlogPost = {
  findAll: async () => BlogPosts,
  findByPk: async (id) => mockFindByPk(BlogPosts, id),
  create: async (data) => mockCreate(BlogPosts, data),
  update: async (fields, { where }) => mockUpdate(BlogPosts, fields, where),
  search: async (query) => mockSearch(BlogPosts, query),
}

module.exports = {
  User,
  Category,
  BlogPost,
};
