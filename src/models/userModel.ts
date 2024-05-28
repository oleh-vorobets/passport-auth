import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: String,
    googleId: String,
});

export const User = model('user', userSchema);
