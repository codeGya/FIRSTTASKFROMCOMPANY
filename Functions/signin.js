import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import mongodb from "mongodb";



export const signInUser = async (event) => {
  console.log(event.body)

  const userInput = JSON.parse(event.body);
  console.log(userInput, 'userInput of logged in users')

  const { email, password } = userInput;
  const MongoClient = mongodb.MongoClient;
  const client = await MongoClient.connect(
    "mongodb+srv://user1:840yrDdPwllFQPMO@cluster0.2q0h8tj.mongodb.net/serverless?retryWrites=true&w=majority"
  );
  let db = client.db();

  const userData = await db
    .collection("users")
    .find({ email: email })
    .toArray();
  console.log(userData);
  let returnValue;
  if (userData.length > 0) {
    const dataMatchingValue = await bcrypt.compare(password, userData[0].password)


    if (dataMatchingValue === true) {

      const authentication = await jwt.sign({ userId: userData[0]._id }, 'abcde')

      const response = JSON.stringify({
        message: "User successfully logged in",
        privateKey: authentication


      })

      returnValue = {
        "statusCode": 200,

        "headers": {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },

        "body": response
      }




    } else {
      let message = {
        message: "User doesn't exist!"
      }
      returnValue = {
        "statusCode": 400,
        "body": JSON.stringify(message)



      };




    }

  }
  return returnValue
}



