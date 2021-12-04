const { MongoClient, ObjectID } = require("mongodb");

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);

const TypesOfRealEstate = async (req, res) => {
  await client.connect();
  const DATABASE = client.db(process.env.NEXT_PUBLIC_DATABASE);
  const COLLECTION = DATABASE.collection("typesOfRealEstate");

  if (req.method === "GET") {
    //Query
    COLLECTION.find()
      .toArray()
      .then((data) => {
        res
          .status(200)
          .json({ name: "Tipos de inmuebles", total: data.length, data });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  } else if (req.method === "POST") {
    // console.log("req.body: ", req.body);

    COLLECTION.insertOne({ value: req.body.newType })
      .then(() => {
        res.status(200).json({ result: "Success", method: req.method });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }
};

export default TypesOfRealEstate;

// db.typesOfRealEstate.insertMany([
//   { value: "Casa" },
//   { value: "Terreno" },
//   { value: "Departamento" },
// ])

// db.typesOfRealEstate.deleteOne({ value: "Bodega" })
