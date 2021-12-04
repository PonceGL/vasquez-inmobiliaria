const { MongoClient, ObjectID } = require("mongodb");

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);

const newHouses = async (req, res) => {
  await client.connect();
  const DATABASE = client.db(process.env.NEXT_PUBLIC_DATABASE);
  const COLLECTION = DATABASE.collection("casas");

  if (req.method === "POST") {
    COLLECTION.insertOne(req.body)
      .then(() => {
        res.status(200).json({ result: "Success", status: true });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }
};

export default newHouses;
