const UserModel=require('../models/UserModel')

const AuthorizeAdministrator=async (req,res,next)=>{
    // once the jwtToken is verified, the decoded token is attached to the req object i.e userId
    const {userId}=req.user
    // console.log("uid",userId)

    if(!userId){
        return res.status(401).json({ message: 'Verify the token' });
    }

    try{
        const user=await UserModel.findById({_id:userId})
        if(!user){
            return res.status(401).json({ message: 'User not found' });
        }
        // console.log("user",user)
        if(user.accountType!=='administrator'){
            return res.status(401).json({ message: 'You are not authorized to perform this action' });
        }
        next()
    }catch(err){
        console.log(err.message)
        return res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports=AuthorizeAdministrator