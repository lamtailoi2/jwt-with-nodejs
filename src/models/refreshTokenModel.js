import { Schema, model } from "mongoose";

const refreshTokenSchema = new Schema({
    refreshToken: {
        type: String,
        unique: true,
    },
    userId: {
        type: String,
        unique: true,
        require: true
    }
},{
    collection: "refreshtokens"
})

const refreshTokenModel = model("refreshtokens", refreshTokenSchema)

export default refreshTokenModel