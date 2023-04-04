
import jwt from 'jsonwebtoken'
import mongodb from "mongodb";
import Object from 'mongodb'
import bcrypt from 'bcrypt'


export const updateUserDetails=async (event)=>{
    
    const MongoClient=mongodb.MongoClient
    const client=await MongoClient.connect('mongodb+srv://user1:840yrDdPwllFQPMO@cluster0.2q0h8tj.mongodb.net/serverless?retryWrites=true&w=majority')
    let db=client.db()
    console.log(event.headers.header1,'event.headers.header1')
    console.log("1")
    console.log(event.headers.header1)
    const userInput=JSON.parse(event.body)
    
    const userUniqueData=await jwt.verify(event.headers.header1,'abcde')
    console.log(userUniqueData,'output of jwt verify')
    console.log("2")
    console.log(userUniqueData,'i am in update function')
    const userUniqueId=userUniqueData.userId
    console.log(userUniqueId,'userUniqueId')
    

    let {firstname,email,lastname,mobilenumber,address,password}=userInput
    const ObjectId=Object.ObjectId
    

    
    const userData=await db.collection('users').find({_id:new ObjectId(userUniqueId)}).toArray()
    console.log(userData,'hey i am in update file')
    if(userData.length===0){
        return {
            "status":400,
            "message":"User Don't exxist"
        }

    }else{
        const hash =await bcrypt.hash(password,10)

            await db.collection('users').updateOne({_id:new ObjectId(userUniqueId)},{$set:{firstName:firstname,lastName:lastname,email:email,mobileNumber:mobilenumber,address:address,password:hash}})

            return {
                "statusCode":200,
                "body":"update user details of logged in user"
                
            }


            }
            
            

    }

    




