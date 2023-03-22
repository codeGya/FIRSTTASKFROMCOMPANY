import {connectionThread} from '../Connection/connection.js'
import jwt from 'jsonwebtoken'

export const updateUserDetails=async (event)=>{
    const userUniqueData=jwt.verify(event.headers.header1,'abcde')
    const userUniqueId=userUniqueData.userId
    const userInput=JSON.parse(event.body)

    let {firstname,email,lastname,mobilenumber,address,password}=userInput

    const client=await connectionThread()
    let db=client.db()
    const userData=await db.collection('users').find({_id:userUniqueId}).toArray()
    if(userData.length===0){
        return {
            status:400
        }

    }else{
        bcrypt.hash(password,10,async (error,hash)=>{

            await db.collection('users').updateOne({email:email},{$set:{f_name:firstname,l_name:lastname,email:email,m_number:mobilenumber,address:address,password:hash}})
            })

    }

    

}


