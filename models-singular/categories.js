'use strict';

// Where is our schema defined?
// How do we get it in here so we can run methods on it?
const categoriesSchema = require('./categories-schema');

class Categories {

  constructor() {
  }


  async get(filters) {
    // Call the appropriate mongoose method to get
    // one or more records
    // If 1, return it as a plain object
    // If 2, return it as an object like this:
    // { count: ##, results: [{}, {}] }
    const query = categoriesSchema.find(filters);
    const result = await query.exec();
    if (result.length == 1) {
      return result[0];
    } else {
      return {count: result.length, results: result};
    }
  }

  create(record) {
    // Call the appropriate mongoose method to create a new record
    return categoriesSchema.create(record);
  }

  update(_id, record) {
    // Call the appropriate mongoose method to update a record
    return categoriesSchema.findByIdAndUpdate(_id, record, { new: true });
  }

  delete(_id) {
    // Call the appropriate mongoose method to delete a record
    return categoriesSchema.findByIdAndDelete(_id);
  }

  deleteMany(filters) {
    return categoriesSchema.deleteMany(filters);
  }
}

module.exports = Categories;
