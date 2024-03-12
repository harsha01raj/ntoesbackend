const jwt=require('jsonwebtoken');
const {blackList}=require('../blackList.js');

const auth=(req,res,next)=>{
    const token=req.headers.authorization.split(' ')[1];
    if(token){
        if(blackList.includes(token)){
            res.send({'Message':"Please login again"});
        }else{
            jwt.verify(token,process.env.ACCESS_SECRET_KEY,(err,decode)=>{
                console.log(decode);
                if(decode){
                    req.body.userID=decode.userID;
                    req.body.user=decode.user;
                    next();
                }else{
                    res.status(400).send({"Error":err})
                }
            })
        }
    }else{
        res.send({"Message":"There is no token in headers.authorization"});
    }
}

module.exports={auth};