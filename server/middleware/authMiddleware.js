import { loginModel } from "../models"
import jwt from "jsonwebtoken";

export const validateLoginParams = (req,res, next) => {
    const {error} = loginModel.validate(req.body)
    if(error) return res.status(400).send({message: 'Invalid or incomplete request', error})
    next()
}

export const verifyToken = (req, res, next) => {
    const bearerHeader = req.body.token || req.headers['x-access-token'];
        if (!bearerHeader){
            return res.status(401).send({
                message: 'Unauthorized user'
            });
        } else if(typeof bearerHeader !== undefined){
            jwt.verify(bearerHeader, process.env.SECRET_KEY,(err, authData) => {
                if(err) {
                    return res.status(403).send({
                        message: "Forbidden access"
                    });
                }
              req.user = authData;
              next();
            })
            
        }
}