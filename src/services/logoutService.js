import refreshTokenModel from "../models/refreshTokenModel.js";

const logoutService = async (user) => {
    await refreshTokenModel({user}, )
    res.json({
        status: "Logout Successfully"

    })
}

export default logoutController