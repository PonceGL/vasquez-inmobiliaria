const { MongoClient, ObjectID } = require("mongodb");

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);

const DeleteTypesOfRealEstate = async (req, res) => {
  await client.connect();
  const DATABASE = client.db(process.env.NEXT_PUBLIC_DATABASE);
  const COLLECTION = DATABASE.collection("typesOfRealEstate");

  if (req.method === "GET") {
    //Query
    COLLECTION.find({ value: { $nin: ["Casa", "Terreno", "Departamento"] } })
      .toArray()
      .then((data) => {
        res.status(200).json({
          name: "Tipos de inmuebles que se pueden eliminar",
          total: data.length,
          data,
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  } else if (req.method === "POST") {
    console.log("req.body: ", req.body);

    COLLECTION.deleteMany({ value: { $in: req.body } })
      .then(() => {
        res.status(200).json({ result: "Success", method: req.method });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }
};

export default DeleteTypesOfRealEstate;

// db.typesOfRealEstate.find({value: { $nin: ["Casa", "Terreno", "Departamento"] }})
// db.typesOfRealEstate.deleteMany({value: { $in: ["Casa", "Terreno", "Departamento"] }})
