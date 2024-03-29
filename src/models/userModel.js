import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email")
            }
        }
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {collection: "users"})

userSchema.pre("save", async function() {
    if(this.isModified) {
        this.password = await bcrypt.hash(this.password, 12);
    }
})

userSchema.method.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password) //return true or false
}

const userModel = model('users', userSchema)
export default userModel