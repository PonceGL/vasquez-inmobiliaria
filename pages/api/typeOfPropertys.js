const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);

const getTypesOfPropertys = async (req, res) => {
  await client.connect();
  const DATABASE = client.db(process.env.NEXT_PUBLIC_DATABASE);
  const COLLECTION = DATABASE.collection("casas");

  if (req.method === "GET") {
    COLLECTION.distinct("typeOfProperty")
      .then((data) => {
        res.status(200).json({
          message: `Tipo de propiedades`,
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

export default getTypesOfPropertys;

// db.casas.updateOne(
//   { _id: ObjectId("61aa58c047f2466b0bf8ca93") },
//   { $set: { typeOfProperty: "casa" } }
// )

// db.casas.distinct("typeOfProperty").sort({ registrationDate: -1 });
