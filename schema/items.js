var mongoose = require('mongoose');  
var ItemSchema = new mongoose.Schema
({  
    itemname: {type:String,required:true},
    category: {type:String,required:true},
    addresses:  [
                    {
                        place: String, 
                        sector: String,
                        city: String,
                        lat: Number,
                        long: Number,
                    }
                ]
});
mongoose.model('Item', ItemSchema);

module.exports = mongoose.model('Item');