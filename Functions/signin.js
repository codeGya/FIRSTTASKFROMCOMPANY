import bcrypt from "bcrypt";
// import {connectionThread} from '../Connection/connection.js'
import jwt from "jsonwebtoken";
import mongodb from "mongodb";

export const signInUser = async (event) => {
  const userInput = JSON.parse(event.body);

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
    bcrypt.compare(password, userData[0].password, async (err, result) => {
      if (result === true) {
        const authentication = jwt.sign({ userId: userData[0]._id }, "abcde");
        console.log(authentication, "authentication");
        returnValue= {
          statusCode: 200,
          privateKey: authentication,
        };
      } else {
        returnValue= {
          statusCode: 400,
        };
      }
      console.log(err, "err in jwt");
    });
    //console.log(err, "err in jwt");
  }

  return returnValue
};
