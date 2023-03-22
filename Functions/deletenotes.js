import {connectionThread} from '../Connection/connection.js'
console.log(connectionThread,'i want to debug my error')
import jwt from 'jsonwebtoken'

export const deleteUser=async (event)=>{
    const userData=JSON.parse(event.headers.header1)

    const userUniqueId=jwt.verify(userData,'abcde')

    const userUniqueIdAfterVerifying=userUniqueId.userId

    const client =await connectionThread()
    let db=client.db()

    const userDataInDatabase=await db.collection('users').find({_id:userUniqueIdAfterVerifying}).toArray()
    if(userDataInDatabase.length>0){
        await db.collection('usernotes').deleteOne({userId:userDataInDatabase[0]._id})



    }else{
        return {
            status:400
        }
    }


}

