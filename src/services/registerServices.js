import AppError from "../core/AppError.js";
import userModel from "../models/userModel.js";


const registerService = async (username, email, password) => {
    if (!email)
        return new AppError("Invalid email", 401)
    if (!username)
        return new AppError("Invalid username", 401)
    if (!password)
        return new AppError("Invalid password", 401)
    
    const user = await userModel.create({
        email, username, password
    })
    if (!user) 
        return new AppError("User existed", 401)
    return user
}

export default registerService