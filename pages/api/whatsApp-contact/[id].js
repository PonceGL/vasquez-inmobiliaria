const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);

const infoWhatsApp = async (req, res) => {
  await client.connect();
  const DATABASE = client.db(process.env.NEXT_PUBLIC_DATABASE);
  const COLLECTION = DATABASE.collection("contactWhatsApp");

  if (req.method === "POST") {
    COLLECTION.insertOne(req.body)
      .then(() => {
        res.status(200).json({
          message: "Numero de WhatsApp registrado con éxito",
          status: true,
        });
      })
      .catch((error) => {
        res.status(409).json({
          message: "Error el metodo de contacto",
          status: false,
          error,
        });
      });
  } else if (req.method === "GET") {
    COLLECTION.find({})
      .toArray()
      .then((data) => {
        res.status(200).json({
          message: "Numero de WhatsApp obtenidos con éxito",
          status: true,
          total: data.length,
          data,
        });
      })
      .catch((error) => {
        res.status(409).json({
          message: "Error al solicitar metodo de contacto",
          error,
        });
      });
  } else if (req.method === "DELETE") {
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
  } else {
    console.log("----------------------------");
    res.status(200).json({
      message: "Otro metodo",
      method: req.method,
    });
  }
};

export default infoWhatsApp;

// db.contactInfo.deleteOne({ _id: ObjectId("61959f4d2e61f40095c013df") })
