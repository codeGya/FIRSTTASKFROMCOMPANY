import mongodb from "mongodb";




import bcrypt from "bcrypt";


export const signUpFunction = async (event) => {
  try {
    console.log(event, 'hey i am event of signup.js')
    const userInput = JSON.parse(event.body);
    console.log(userInput, 'hey i am userInput')

    let { firstname, email, lastname, mobilenumber, address, password } =
      userInput;
    const MongoClient = mongodb.MongoClient;
    console.log(password)
    console.log(1)
    const client = await MongoClient.connect(
      "mongodb+srv://user1:840yrDdPwllFQPMO@cluster0.2q0h8tj.mongodb.net/serverless?retryWrites=true&w=majority"
    );
    console.log(client, 'i am client')


    let db = client.db();
    console.log(db, 'db')



    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)

    await db.collection("users").insertOne({
      firstName: firstname,
      lastName: lastname,
      email: email,
      mobileNumber: mobilenumber,
      address: address,
      password: hashedPassword,
    });

    let data = JSON.stringify({ message: "User registered successfully" })
    console.log(data, 'i am data of signup after stringyfying')

    console.log(data)
    return {
      "statusCode": 200,
      "headers": {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: data
    };
  } catch (error) {
    console.log("error", error);
    return {
      "statusCode": 400,
    };
  }
};
