import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstname: {
        type: String, 
        required: true
    },

    lastname: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },

     phone: {
        type: String, 
        required: true,
        unique: true
    },

    dob: {
        type: String, 
        required: true,
    },

    nationality: {
        type: String, 
        required: true,
        
    },


    state: {
        type: String, 
        required: true,
        
    },

    lga: {
        type: String, 
        required: true
    },

    city: {
        type: String,
        required: true,
    },

    password: {
        type: String, 
        required: true
    },


    })


    const User = mongoose.models.User || mongoose.model("User", userSchema);


    export default User;