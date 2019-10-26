const Products = require('../../models-singular/products.js');
let products = new Products();

require('../supergoose.js');

describe('Products Model (Singular)', () => {

  beforeEach(async () => {
    await products.deleteMany({});
  });

  // How will you handle both the happy path and edge cases in these tests?

  it('can create() a new product', async () => {
    let obj = { _id: '10', name: 'John', description: 'Person' };
    
    const record = await products.create(obj);
    Object.keys(obj).forEach(key => {
      expect(record[key]).toEqual(obj[key]);
    });  
  });

  it('can get() a product', async () => {
    let obj = { _id: '123', name: 'John', description: 'Person' };
    await products.create(obj);
    const record = await products.get({_id: obj._id});
    Object.keys(obj).forEach(key => {
      expect(record[key]).toEqual(obj[key]);
    });
  });


  it('can get() all products', async () => {
    let obj1 = { _id: '1', name: 'John', description: 'Person' };
    let obj2 = { _id: '2', name: 'John2', description: 'Person2' };
    
    await products.create(obj1);
    await products.create(obj2);

    const records = await products.get({});
    expect(records.count).toEqual(2);
  });

  it('can update() a product', async () => {
    let obj = { _id: '123', name: 'John', description: 'Person' };
    await products.create(obj);
    await products.update('123', {name: 'Tarzan'});
    const record = await products.get({_id: obj._id});
    expect(record.name).toEqual('Tarzan');
  });

  it('can delete() a product', async () => {
    let obj = { _id: '123', name: 'John', description: 'Person' };
    await products.create(obj);
    await products.delete('123');
    const record = await products.get({_id: obj._id});
    expect(record.count).toEqual(0);
  });

});