const mongoose = require('mongoose');

const CategroySchema= mongoose.Schema.create({  
    name: { type: String, required: true},
    description: { type: String },
   
});

const Category = mongoose.model('Categories', CategroySchema);

module.exports = {Category};