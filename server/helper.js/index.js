import pool from "../database"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const executeQuery = (sql, params = []) => {
    return new Promise((resolve,reject) => {
        // pool.((err, client, done) => {
        //     if(err) return reject(err);  
        //     // return reject(err)
        //     client.query(sql,params, (err,result) => {
        //         if(err)return reject(err)
        //         resolve(result.rows)
        //         done()
        //     })
        // })
        pool.query(sql,params, function(err,rows, fields){
            if(err) return reject(err)
            resolve(rows)
        })
    })
} 

export const assignToken = (payload=null, secret=process.env.SECRET_KEY || 'cbcgedutechnologiesisawersom') => {
    
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, { expiresIn: '60 days' }, (err, token) => {
            if (err) {
               return reject(err);
            } else {
               return resolve(token);
            }
        })

    })
}

export const generatePasswordHash = (password='') => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('bacon', salt);
    return hash
}

export const isPasswordEqualHashPassword = (hash='', plainPassword='') => {
    const response = bcrypt.compareSync(plainPassword, hash)
    if(response)
        return true
    return false
}