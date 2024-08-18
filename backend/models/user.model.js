import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        default: ''
    },
    searchHistory: {
        type: Array,
        default: []
    }

});

// Check if the model already exists before defining it
const User = mongoose.models.User || mongoose.model('User', userSchema);

export { User };