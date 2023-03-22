import {connectionThread} from '../Connection/connection.js'
import jwt from 'jsonwebtoken'

export const numberOfTextOfUser=async (event)=>{
    const userData=JSON.parse(event.headers.header1)

    const userInput=jwt.verify(userData,'abcde')
    const userUniqueData=userInput.userId
    const client=await connectionThread()

    const db=client.db()

    const userDataInDatabase=await db.collection('users').find({_id:userUniqueData}).toArray()
    if(userDataInDatabase.length>0){
        const userNoOfNotes=await db.collection('usernotes').find({userId:userDataInDatabase[0]._id}).toArray()
        const numberOfNotesOfUser=userNoOfNotes.length

    }else{
        return {
            status:400
        }
    }

}

