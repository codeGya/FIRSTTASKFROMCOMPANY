import mongodb from "mongodb";

console.log(2)

// export const connectionThread=async ()=>{
//     try{
//         console.log('i am not able to debug a small error')
//         return await MongoClient.connect('mongodb+srv://user1:840yrDdPwllFQPMO@cluster0.2q0h8tj.mongodb.net/serverless?retryWrites=true&w=majority')

//     }
//     catch (error){
//         console.log(error)
//     }

// }

// "../Connection/connection.js").connectionThread;
// console.log(connectionThread,'hey i am connection thread')
import bcrypt from "bcrypt";
// import mongodb from "mongodb";
// const MongoClient=mongodb.MongoClient

export const signUpFunction = async (event) => {
  try {
    const userInput = JSON.parse(event.body);
    //console.log(connectionThread);

    let { firstname, email, lastname, mobilenumber, address, password } =
      userInput;
    const MongoClient = mongodb.MongoClient;
    console.log(password)
    console.log(1)
    const client = await MongoClient.connect(
      "mongodb+srv://user1:840yrDdPwllFQPMO@cluster0.2q0h8tj.mongodb.net/serverless?retryWrites=true&w=majority"
    );
    console.log(client,'i am client')

    //   "mongodb+srv://user1:840yrDdPwllFQPMO@cluster0.2q0h8tj.mongodb.net/serverless?retryWrites=true&w=majority"
    // );
    let db = client.db();
    console.log(db,'db')

    // console.log("when you will be back to bengaluru");
    // console.log(client);

    bcrypt.hash(password,10,async(error, hash) => {
      
      await db.collection("users").insertOne({
        firstName: firstname,
        lastName: lastname,
        email: email,
        mobileNumber: mobilenumber,
        address: address,
        password: hash,
      });
      console.log(hash)
      console.log(error,'hash error')
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      statusCode: 400,
    };
  }
};
