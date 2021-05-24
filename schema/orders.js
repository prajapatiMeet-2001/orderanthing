var mongoose = require('mongoose');  
var OrderSchema = new mongoose.Schema
({  
    userid: {type:String,required:true},
    orderstage: {type:String,required:true},
    delpersonId: {type:String,required:true},
    items:  [
                {
                    item: String, 
                    quantity: Number,
                    location: Object,
                }
            ]
});
mongoose.model('Order', OrderSchema);

module.exports = mongoose.model('Order');