'use strict';

const mongoose = require('mongoose');

// Require your model

// Mongoose Server URI
const MONGOOSE_URI = 'mongodb://localhost:27017/class05';

// Connect
mongoose.connect(MONGOOSE_URI, { useUnifiedTopology: true, useNewUrlParser: true });

// Do some work
const Categories = require('./models-singular/categories.js');
const categories = new Categories();

/**
 * @param
 * @returns
 */
async function doWork() {
  await categories.delete(9);
  await categories.create(
    {_id: '9', name: 'John', description: 'person' }
  );
  await categories.update(9,
    {name: 'Peach'}
  );

  const fetched = await categories.get(9);
  console.log(fetched);
}

doWork().then(() => {
  // Disconnect
  mongoose.disconnect();
  console.log('disconnect');
}).catch(err => {
  console.log('Error: ',err);
  mongoose.disconnect();
  console.log('disconnect');
});



/*
categories.create({_id: '5', name: 'John', description: 'person' }).then(() => {
  categories.get(5).then( (result) => {
    console.log(result);

    // Disconnect
    mongoose.disconnect();
    console.log('disconnect');
  });
});
*/