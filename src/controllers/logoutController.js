import refreshTokenModel from "../models/refreshTokenModel.js";

const logoutController = async (req, res, next) => {
    const token = req.cookies.refreshToken
    await refreshTokenModel.findOneAndDelete({
        refreshToken: token
    })
    res.clearCookie("refreshToken")
    res.json({
        status: "Logout Successfully"

    })
}

export default logoutController