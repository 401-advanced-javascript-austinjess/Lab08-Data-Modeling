'use strict';

const Category = require('./categorySchema');

class Categories {
  get(_id) {
    if (!/^[0-9a-z]{24}$/i.test(_id)) return Promise.resolve(null);

    return Category.findOne({ _id: _id });
  }

  post(record) {
    const newCategory = new Category(record);
    return newCategory.save();
  }

  put(_id, record) {}

  delete(_id) {
    return Category.drop({ _id: _id });
  }
}

module.exports = Categories;
