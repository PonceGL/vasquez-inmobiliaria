const { MongoClient, ObjectID } = require("mongodb");

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);

const Subdivisions = async (req, res) => {
  await client.connect();
  const DATABASE = client.db(process.env.NEXT_PUBLIC_DATABASE);
  const COLLECTION = DATABASE.collection("fraccionamiento");

  if (req.method === "GET") {
    //Query
    COLLECTION.aggregate([{ $limit: 2 }])
      .toArray()
      .then((data) => {
        res
          .status(200)
          .json({ name: "Fraccionamientos", total: data.length, data });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  } else if (req.method === "POST") {
    res.status(200).json({ name: "MongoDB", method: req.method });
  }
};

export default Subdivisions;
