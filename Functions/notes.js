import {connectionThread} from '../Connection/connection.js'
import jwt from 'jsonwebtoken'

export const userNotes=async (event)=>{

    const userNotes=JSON.parse(event.body)
    const userNotesAfterParsingData=userNotes.userNotes

    const client=await connectionThread()
    let db=client.db()

    const userData=await db.collection('users').find({_id:event.headers.header1})
    if(userData.length>0){
        await db.collection('usernotes').insertOne({text:userNotesAfterParsingData,userId:userData[0]._id})
    }else{
        return {
            status:400
        }
    }

}

