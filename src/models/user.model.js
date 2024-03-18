import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userCollection = 'user'

const userSchema = new mongoose.Schema({
    username: { type: String, require: true, trim: true },
    accountId: { type: String },
    email: { type: String, require: true, trim: true, unique: true },
    password: { type: String, require: true },
    provider: { type: String }
},
{
    timestamps: true,
    versionKey: false,
})

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };


export default mongoose.model(userCollection, userSchema)
