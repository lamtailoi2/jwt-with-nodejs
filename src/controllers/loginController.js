import AppError from "../core/AppError.js";
import loginService from "../services/loginService.js";
import jwtService from "../services/jwtService.js";
import refreshTokenModel from "../models/refreshTokenModel.js";

const loginController = async (req, res, next) => {
    const {username, password, email} = req.body
    if (!email)
        return next(new AppError("Input your email", 401))
    if (!password)
        return next(new AppError("Invalid password", 401))
    const user = await loginService(email, password)
    if (!user)
        return next(new AppError("Invalid User", 401))
    const { accessToken, refreshToken } = jwtService.createToken(user)
    const found = !await refreshTokenModel.findOne({
        userId: user._id
    })
    console.log(found);
    if (found)
        await refreshTokenModel.create({
            refreshToken,
            userId: user._id
        })
    else {
        await refreshTokenModel.findOneAndUpdate({
            userId: user._id
        }, {
            refreshToken
        })
    }
    
    res.cookie("refreshToken", refreshToken,{
        httpOnly: true,
        secure: false, //Khi deploy set true
        path:"/",
        sameSite: "strict"
    })
    res.json({
        status: "successful",
        user,
        accessToken
    })
}

export default loginController