'use strict';

/** Class representing a generic mongo model. */
class Model {

  /**
   * Model Constructor
   * @param schema {object} - mongo schema
   */
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * Retrieves one or more records
   * @param filters {object} optional mongo filters
   * @returns {count:#,results:[{*}]} | {*}
   */
  async get(filters) {
    // Call the appropriate mongoose method to get
    // one or more records
    // If 1, return it as a plain object
    // If 2, return it as an object like this:
    // { count: ##, results: [{}, {}] }
    const query = this.schema.find(filters);
    const result = await query.exec();
    if (result.length == 1) {
      return result[0];
    } else {
      return {count: result.length, results: result};
    }
  }
  

  /**
   * Create a new record
   * @param record {object} matches the format of the schema
   * @returns {*}
   */
  create(record) {
    // Call the appropriate mongoose method to create a new record
    return this.schema.create(record);
  }

  /**
   * Replaces a record in the database
   * @param _id {string} Mongo Record ID
   * @param record {object} The record data to replace. ID is a required field
   * @returns {*}
   */
  update(_id, record) {
    // Call the appropriate mongoose method to update a record
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }

  /**
   * Deletes a recod in the model
   * @param _id {string} Mongo Record ID
   * @returns {*}
   */
  delete(_id) {
    // Call the appropriate mongoose method to delete a record
    return this.schema.findByIdAndDelete(_id);
  }

  deleteMany(filters) {
    return this.schema.deleteMany(filters);
  }
}

module.exports = Model;
