const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);

const Houses = async (req, res) => {
  await client.connect();
  const DATABASE = client.db(process.env.NEXT_PUBLIC_DATABASE);
  const COLLECTION = DATABASE.collection("casas");

  if (req.method === "POST") {
    COLLECTION.find(req.body.match, req.body.query)
      .limit(20)
      .sort({ registrationDate: -1 })
      .toArray()
      .then((data) => {
        res.status(200).json({
          message: `Casas`,
          status: true,
          total: data.length,
          data,
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  } else {
    res.status(200).json({
      message: `Default`,
      status: false,
      method: req.method,
    });
  }
};

export default Houses;

// db.casas.find(
//   {},
//   {
//     subdivision: 1,
//     title: 1,
//     registrationDate: 1,
//     showOnweb: 1,
//     typeOfProperty: 1,
//     price: 1,
//     terrainSize: 1,
//     rooms: 1,
//     bathrooms: 1,
//     parking: 1,
//   }
// ).limit(20).sort({ registrationDate: -1 })
