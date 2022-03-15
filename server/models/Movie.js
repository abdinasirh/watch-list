const { Schema, Model } = require('mongoose');

const movieSchema = new Schema ({
    
    title: {
        type: String,
        require: true,
        trim: true,
    },
    year: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true
    },
    director: {
        type:String,
        trim: true
    },
    actors:{
        type: String,
        trim: true
    },
    seenCount: {
        type: Number,
        required: true,
        default: 0,
    },
})