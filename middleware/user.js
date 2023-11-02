import jwt from 'jsonwebtoken'
import User from '../modal/User.js'
export default async function (req,res,next){
    if(!req.cookies.token){
        next()
        return
    }

const token=req.cookies.token
const decode=jwt.verify(token,'vohid8')
const user=await User.findById(decode.userId)
req.userId=user.id
    next()
}