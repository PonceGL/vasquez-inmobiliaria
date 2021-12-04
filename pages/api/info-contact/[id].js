const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);

const updateInfoContact = async (req, res) => {
  await client.connect();
  const DATABASE = client.db(process.env.NEXT_PUBLIC_DATABASE);
  const COLLECTION = DATABASE.collection("contactInfo");

  if (req.method === "DELETE") {
    COLLECTION.deleteOne({ _id: ObjectId(req.query.id) })
      .then(() => {
        res.status(200).json({
          message: "Datos de contacto eliminado con éxito",
          status: true,
        });
      })
      .catch((error) => {
        res.status(409).json({
          message: "Error al eliminar",
          status: false,
          error,
        });
      });
  }
};

export default updateInfoContact;

// db.contactInfo.deleteOne({ _id: ObjectId("61959f4d2e61f40095c013df") })
