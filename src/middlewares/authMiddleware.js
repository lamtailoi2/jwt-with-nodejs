import jwt from "jsonwebtoken"
import AppError from "../core/AppError.js"

const authMiddleware = {
    tokenVerify(req, res, next) {
        if (!req.headers.token)
            return next(new AppError("Invalid token", 401))
        const token = req.headers.token.split(" ")[1]
        jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
            if (err) 
                return next(new AppError("Invalid token", 401))
            req.user = user
            next();
        })
    }
}

export default authMiddleware