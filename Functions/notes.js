
import jwt from 'jsonwebtoken'
import mongodb from 'mongodb'

import Object from 'mongodb'


export const userNotes=async (event)=>{

    
    const MongoClient=mongodb.MongoClient

    const client=await MongoClient.connect('mongodb+srv://user1:840yrDdPwllFQPMO@cluster0.2q0h8tj.mongodb.net/serverless?retryWrites=true&w=majority')
    let db=client.db()
    

    const userNotes=JSON.parse(event.body)
   
    const userNotesAfterParsingData=userNotes.userNotes
   
    const ObjectId=Object.ObjectId
    

    const uniqueUserId=jwt.verify(event.headers.header1,'abcde')
    
    const userId=uniqueUserId.userId
    const notes={
        inputData:userNotesAfterParsingData,
        message:"Successfully inserted User Data"
    }

    const userData=await db.collection('users').find({_id:new ObjectId(userId)}).toArray()

    if(userData.length>0){
        const userInputData=await db.collection('usernotes').insertOne({text:userNotesAfterParsingData,userId:new ObjectId(userId)})

        return {
            "statusCode":200,
            
            "body":JSON.stringify(notes)
        }
    }else{
        let message={
            message:"User don't exist!"
        }
        return {
            "statusCode":400,
            "body":JSON.stringify(message)
        }
    }

}

