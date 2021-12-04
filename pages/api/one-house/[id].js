const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);

const Houses = async (req, res) => {
  await client.connect();
  const DATABASE = client.db(process.env.NEXT_PUBLIC_DATABASE);
  const COLLECTION = DATABASE.collection("casas");

  if (req.method === "GET") {
    COLLECTION.find({ _id: ObjectId(req.query.id) })
      .toArray()
      .then((data) => {
        res
          .status(200)
          .json({ message: `Casas id ${req.query.id}`, status: true, data });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  } else {
    res.status(200).json({ name: "MongoDB", method: req.method });
  }
};

export default Houses;
// COLLECTION.updateOne({ _id: ObjectId("61687ef56f3e4d33540dfb3a")}, { $set: { showOnweb: true } })
// db.casas.updateOne({_id: ObjectId("61687ef56f3e4d33540dfb3a")}, { $set: { showOnweb: true } })
// Eliminar una propiedad
// db.casas.updateOne({_id: ObjectId("61687ef56f3e4d33540dfb3a")}, { $unset: { property: "" } })
