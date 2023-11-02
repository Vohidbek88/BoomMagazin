import jwt from "jsonwebtoken";

const geneRateToken=(userId)=>{
const accestoken=jwt.sign({userId},'vohid8',{expiresIn:'30d'})
return accestoken
}

export {geneRateToken}