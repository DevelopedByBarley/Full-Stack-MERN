import mongoose from "mongoose";
const { Schema } = mongoose;

export const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

export const getUsers = async () => { return await User.find() };
export const getUserById = async (id: string) => { return await User.findById(id) }
export const getUserByEmail = async (email: string) => { return await User.findOne({email: email}) }
export const createUser = async (values: Record<string, any>) => {
  return await User.create(values);
}
export const deleteUserById = async (id: string) => { return await User.findOneAndDelete({ _id: id }) }


