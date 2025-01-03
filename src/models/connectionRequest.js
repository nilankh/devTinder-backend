const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    status: {
        type: String,
        required:true,
        enum: {
            values: ['ignored', 'interested','accepted', 'rejected'],
            message: `{VALUE} is incorrect status type`
        }
    },
},
{
    timestamps:true,
}
);

// validation,this is a kind of middleware, it will be call everytime before save
connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    // check if the fromUserId and toUserId are same
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("fromUserId and toUserId can not be same");
    }
    next();
})

const ConnectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports = ConnectionRequestModel;