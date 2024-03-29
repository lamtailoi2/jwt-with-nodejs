import registerService from "../services/registerServices.js"
import AppError from "../core/AppError.js"
import jwtService from "../services/jwtService.js"
import refreshTokenModel from "../models/refreshTokenModel.js";

const registerController = async (req, res, next) => {
    const {email, username, password} = req.body
    if (!email)
        return next(new AppError("Invalid email", 401))
    if (!username)
        return next(new AppError("Invalid username", 401))
    if (!password)
        return next(new AppError("Invalid password", 401))
    const user = await registerService(username, email, password)
    const { accessToken, refreshToken } = jwtService.createToken(user)
    await refreshTokenModel.create({
        refreshToken,
        userId: user._id
    })
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

export default registerController