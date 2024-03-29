import AppError from "../core/AppError.js";
import userModel from "../models/userModel.js";

const loginService = async (email, password) => {
    if (!email )
        return new AppError("Input your email", 401)
    if (!password)
        return new AppError("Invalid password", 401)
    const user = userModel.findOne({
        email
    }).select("+password")
    if (!user && !user.comparePassword(password, user.password)) 
        return new AppError("User not found!!!", 401)
    return user
   
}

export default loginService