import mongodb from 'mongodb'
import jwt from 'jsonwebtoken'
import Object from 'mongodb'

export const numberOfTextOfUser=async (event)=>{
   

    const userInput=jwt.verify(event.headers.header1,'abcde')
    const userUniqueData=userInput.userId
    const MongoClient=mongodb.MongoClient
    const client=await MongoClient.connect('mongodb+srv://user1:840yrDdPwllFQPMO@cluster0.2q0h8tj.mongodb.net/serverless?retryWrites=true&w=majority')

    const db=client.db()
    const ObjectId=Object.ObjectId

    const userDataInDatabase=await db.collection('users').find({_id:new ObjectId(userUniqueData)}).toArray()
    if(userDataInDatabase.length>0){
        const userNoOfNotes=await db.collection('usernotes').find({userId:new ObjectId(userUniqueData)}).toArray()
        const numberOfNotesOfUser=userNoOfNotes.length
       

        const userNumberOfNotes={
            notesOfUser:userNoOfNotes,
            message:"Fetched data successfully of user",
            numberOfNotesOfUser:numberOfNotesOfUser
        }
        return {
            "statusCode":200,
            
            "body":JSON.stringify(userNumberOfNotes)
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

