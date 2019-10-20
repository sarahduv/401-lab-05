const Categories = require('../../models-modular/categories/categories.js');
let categories = new Categories();

require('../supergoose.js');


describe('Categories Model (Modular)', () => {

  beforeEach(async () => {
    await categories.deleteMany({});
  });

  // How will you handle both the happy path and edge cases in these tests?

  it('can create() a new category', async () => {
    let obj = { _id: '10', name: 'John', description: 'Person' };
    
    const record = await categories.create(obj);
    Object.keys(obj).forEach(key => {
      expect(record[key]).toEqual(obj[key]);
    });  
  });

  it('can get() a category', async () => {
    let obj = { _id: '123', name: 'John', description: 'Person' };
    await categories.create(obj);
    const record = await categories.get({_id: obj._id});
    Object.keys(obj).forEach(key => {
      expect(record[key]).toEqual(obj[key]);
    });
  });


  it('can get() all categories', async () => {
    let obj1 = { _id: '1', name: 'John', description: 'Person' };
    let obj2 = { _id: '2', name: 'John2', description: 'Person2' };
    
    await categories.create(obj1);
    await categories.create(obj2);

    const records = await categories.get({});
    expect(records.count).toEqual(2);
  });

  it('can update() a category', async () => {
    let obj = { _id: '123', name: 'John', description: 'Person' };
    await categories.create(obj);
    await categories.update('123', {name: 'Tarzan'});
    const record = await categories.get({_id: obj._id});
    expect(record.name).toEqual('Tarzan');
  });

  it('can delete() a category', async () => {
    let obj = { _id: '123', name: 'John', description: 'Person' };
    await categories.create(obj);
    await categories.delete('123');
    const record = await categories.get({_id: obj._id});
    expect(record.count).toEqual(0);
  });

});