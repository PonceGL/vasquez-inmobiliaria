const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);

const updateProperty = async (req, res) => {
  await client.connect();
  const DATABASE = client.db(process.env.NEXT_PUBLIC_DATABASE);
  const COLLECTION = DATABASE.collection("fraccionamiento");

  if (req.method === "POST") {
    // console.log(req.body);
    COLLECTION.updateOne(
      { _id: ObjectId(`${req.body.id}`) },
      { $set: req.body.set }
    )
      .then(() => {
        res
          .status(200)
          .json({ message: `Fraccionamiento id ${req.body.id}`, status: true });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  } else {
    res.status(200).json({
      message: `Default`,
      status: false,
    });
  }
};

export default updateProperty;
// COLLECTION.updateOne({ _id: ObjectId("61687ef56f3e4d33540dfb3a")}, { $set: { showOnweb: true } })
// db.fraccionamiento.updateOne({_id: ObjectId("61687ef56f3e4d33540dfb3a")}, { $set: { showOnweb: true } })
// Eliminar una propiedad
// db.casas.updateOne({_id: ObjectId("61687ef56f3e4d33540dfb3a")}, { $unset: { property: "" } })
