const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const User = require('./users');

const commentSchema = new Schema({
    rating:{
        type:Number,
        required:true,
        max:5,
        min:0
    },
    comment:{
        type: String,
        required: true
    },
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: true
    }
)

const dishSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
        required : true
    },
    image: {
        type: String,
        required:true
    },
    category: {
        type:String,
        required:true
    },
    label :{
        type:String,
        default:''
    },
    featured:{
        type:String,
        required:true
    },
    price:{
        type:Currency,
        required:true
    },
    comments : [commentSchema]
},

    {
        timestamps : true
    }
);

var Dishes = mongoose.model('Dish',dishSchema);

module.exports = Dishes;
