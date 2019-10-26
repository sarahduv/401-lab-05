'use strict';

// Where is our schema defined?
// How do we get it in here so we can run methods on it?
const productsSchema = require('./products-schema');

class Products {

  constructor() {
  }

  /**
 * @param {filters} this takes in a parameter to filter by
 * @returns {object} this will return the number of records matching the param, as well as the objects
 */
  async get(filters) {
    // Call the appropriate mongoose method to get
    // one or more records
    // If 1, return it as a plain object
    // If 2, return it as an object like this:
    // { count: ##, results: [{}, {}] }
    const query = productsSchema.find(filters);
    const result = await query.exec();
    if (result.length == 1) {
      return result[0];
    } else {
      return {count: result.length, results: result};
    }
  }

  /**
   * @param {record} - this takes in an object request to create a new entry
   * @return {record} - this returns the created record
   */
  create(record) {
    // Call the appropriate mongoose method to create a new record
    return productsSchema.create(record);
  }

  /**
   * @param {id} - takes in the id to find the object
   * @param {record} - takes in the record to change correlating to the id
   * @return {object} - returns the updated object
   */
  update(_id, record) {
    // Call the appropriate mongoose method to update a record
    return productsSchema.findByIdAndUpdate(_id, record, { new: true });
  }

  /**
   * @param {id} - takes in an id of the file to delete
   * @return {function} - returns the function used to delete the specified record
   */
  delete(_id) {
    // Call the appropriate mongoose method to delete a record
    return productsSchema.findByIdAndDelete(_id);
  }

  /**
   * @param {filter} - takes in an empty object to delete all records
   * @return {function} - executes a function that deletes all records
   */
  deleteMany(filters) {
    return productsSchema.deleteMany(filters);
  }
}

module.exports = Products;
