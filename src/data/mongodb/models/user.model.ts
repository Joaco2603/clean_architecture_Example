import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  img: {
    type: String
  },
  roles: {
    type: [String],
    default: ['USER'],
    enum: ['USER', 'ADMIN']
  }
})


export const UserModel = mongoose.model('USER', userSchema);
