const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);

const deleOneProperty = async (req, res) => {
  await client.connect();
  const DATABASE = client.db(process.env.NEXT_PUBLIC_DATABASE);
  const COLLECTION = DATABASE.collection("fraccionamiento");

  if (req.method === "POST") {
    COLLECTION.deleteOne({ _id: ObjectId(req.body.id) })
      .then(() => {
        res
          .status(200)
          .json({ message: `Casas id ${req.body.id}`, status: true });
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

export default deleOneProperty;

// db.casas.deleteOne({_id: ObjectId("61a79b4a49a741310a6e1d10")})
