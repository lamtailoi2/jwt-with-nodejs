import jwt from "jsonwebtoken"
import AppError from "../core/AppError.js"
import refreshTokenModel from "../models/refreshTokenModel.js"

const jwtService = {
    createToken(user) {
        const payLoad = {
            id: user._id,
            email: user.email,
            role: user.role
        }
        const accessToken = jwt.sign(payLoad, process.env.SECRET_ACCESS_TOKEN, {expiresIn: "30 seconds"})
        const refreshToken = jwt.sign(payLoad, process.env.SECRET_REFRESH_TOKEN, {expiresIn: "1 days"})
        return {accessToken, refreshToken}
    },
    async requestRefreshToken(req, res, next) {

        /* Step to refresh toke:
        1. Get token from cookie
        2. Verify that token
        3. Create new accessToken, refreshToken then update it in DB 
        */
       console.log(req.cookies);
        if (!req.cookies.refreshToken) 
            return next(new AppError("You are not authenticated!!!", 401))
        
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) return next(new AppError("You are not authenticated!!!", 401))
        jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN, async (err, user) => {
            if (err)
                console.log(err);
            console.log(user);
            const {accessToken, refreshToken} = jwtService.createToken(user)
            const newAccessToken = accessToken
            const newRefreshToken = refreshToken
            res.cookie("refreshToken", newRefreshToken,{
                httpOnly: true,
                secure: false, //Khi deploy set true
                path:"/",
                sameSite: "strict"
            })
            await refreshTokenModel.findOneAndUpdate({userId: user.id}, {refreshToken: newRefreshToken})
            res.json({
                status: "refresh successfully",
                accessToken: newAccessToken,
            })
        })

    }
}

export default jwtService