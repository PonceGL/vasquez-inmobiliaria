const { MongoClient, ObjectID } = require("mongodb");

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);

const Subdivisions = async (req, res) => {
  await client.connect();
  const DATABASE = client.db(process.env.NEXT_PUBLIC_DATABASE);
  const COLLECTION = DATABASE.collection("fraccionamiento");

  if (req.method === "POST") {
    COLLECTION.find(req.body.match, req.body.query)
      .limit(req.body.limit)
      .sort({ registrationDate: -1 })
      .toArray()
      .then((data) => {
        res.status(200).json({
          message: `Fraccionamientos`,
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
    });
  }
};

export default Subdivisions;

// db.fraccionamiento.aggregate({ subdivision: La Molienda }, { $limit: 2 })

// db.fraccionamiento.updateOne({_id: ObjectId("61a7bc96b88d355a69fbee02")}, {$set: {subdivision: "La Molienda"}})

// db.fraccionamiento.find(
//   {
//     _id: ObjectId("61a7bc96b88d355a69fbee02"),
//     showOnweb: { $eq: true }
//   },
//   {
//     name: 1,
//     mainPhotography: 1,
//     pricem2: 1,
//     showOnweb: 1,
//   }
// )

// db.fraccionamiento.find(
//     {
//       showOnweb: { $eq: true },
//       subdivision: { $in: ["La Molienda", "Ojo De Agua", "Otro", null] },
//       typeOfProperty: { $eq: "departamento" },
//       price: { $gte: 0, $lte: 999999999 },
//       terrainSize: { $gte: 0, $lte: 999999999 },
//       rooms: { $in: [0, ""] },
//       bathrooms: { $in: [0, ""] },
//       parking: { $in: [0, ""] },
//     },
//     {
//       title: 1,
//       address: 1,
//       description: 1,
//       mainPhotography: 1,
//       price: 1,
//       _id: 1,
//       rooms: 1,
//       bathrooms: 1,
//       parking: 1,
//       terrainSize: 1,
//     }
//   ).limit(20).sort({ registrationDate: -1 })

// db.fraccionamiento.find(
//   {
//     rooms: { '$in': [ 0, '' ] },
//      bathrooms: { '$in': [ 0, '' ] },
//      parking: { '$in': [ 0, '' ] }
//   }
// ).limit(20).sort({ registrationDate: -1 })

// db.fraccionamiento.updateMany({parking: { $in: ["", null] }}, { $set: { parking: 0 } })
