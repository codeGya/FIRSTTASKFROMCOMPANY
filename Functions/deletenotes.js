import mongodb from 'mongodb'
import jwt from 'jsonwebtoken'
import Object from 'mongodb'

export const deleteUser=async (event)=>{
   
    const keyOfParticularDocument=event.queryStringParameters.id
    

    const userUniqueId=jwt.verify(event.headers.header1,'abcde')

    const userUniqueIdAfterVerifying=userUniqueId.userId

    const MongoClient=mongodb.MongoClient
    const client=await MongoClient.connect('mongodb+srv://user1:840yrDdPwllFQPMO@cluster0.2q0h8tj.mongodb.net/serverless?retryWrites=true&w=majority')
    let db=client.db()
    const ObjectId=Object.ObjectId

    const userDataInDatabase=await db.collection('users').find({_id:new ObjectId(userUniqueIdAfterVerifying)}).toArray()
    if(userDataInDatabase.length>0){
        const message=JSON.stringify({"data":"deleted data"})
        await db.collection('usernotes').deleteMany({userId:new ObjectId(userUniqueIdAfterVerifying),_id:new ObjectId(keyOfParticularDocument)})
        return {
            "statusCode":200,
            "body":message

        }



    }else{
        const message={
            message:"User doesn't exist!"
        }
        return {
            "statusCode":400,
            "body":JSON.stringify(message)
        }
    }


}

