//   import mongoose  from "mongoose";
const mongoose=require('mongoose')

const roomSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter room name'],
        trim:true,
        maxlength:[100,'Room name can not exceed 100 characters']
    },
    pricePerNight:{
        type:Number,
        required:[true,'please enter room price'],
        trim:true,
        maxlength:[100,'Room price can not exceed 100 characters'],
        default:0.0
    },

    description:{
        type:String,
        required:[true,'please enter room description'],
    },
    address:{
        type:String,
        required:[true,'please enter room address'],
    },
    guestCapacity:{
        type:Number,
        required:[true,'please enter room capacity'],
    },
    numOfBeds:{
        type:Number,
        required:[true,'please enter room number of bed'],
    },
    internet:{
        type:Boolean,
        default:false,
    },
    breakfast:{
        type:Boolean,
        default:false,
    },
    airConditioned:{
        type:Boolean,
        default:false,
    },
    petsAllowed:{
        type:Boolean,
        default:false,
    },
    roomCleaning:{
        type:Boolean,
        default:false,
    },
    ratings:{
        type:Number,
        default:0,
    },
    numOfReviews:{
        type:Number,
        default:0,
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            },
        }
    ],

    category:{
        type:String,
        required:[true,'please enter the room category'],
        enum:{
            values:[
                'King',
                'Single',
                'Twins'
                
            ],
            message:'please select correct category for room'
        }
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:'User',
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            },
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})


module.exports = mongoose.models.Room || mongoose.model('Room',roomSchema)