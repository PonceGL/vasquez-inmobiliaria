const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);

const getSomeHouses = async (req, res) => {
  await client.connect();
  const DATABASE = client.db(process.env.NEXT_PUBLIC_DATABASE);
  const COLLECTION = DATABASE.collection("casas");

  if (req.method === "POST") {
    COLLECTION.find(req.body.match, req.body.query)
      .limit(req.body.limit)
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
    });
  }
};

export default getSomeHouses;

// db.casas.updateOne({ _id: ObjectId("61f58a7b1ebbfece1daa0e69") }, {$set: {typeOfProperty: "terreno"}});

// {
//   _id: ObjectId("61f57596a9530ed646a82076"),
//   typeOfProperty: 'casa',
//   title: 'RESIDENCIAL LA MOLIENDA (G-127)',
//   price: 832464,
//   currency: null,
//   pricem2: 5400,
//   typeOfTransaction: 'Venta',
//   address: 'LOTE 127 MZNA G',
//   location: { lat: '19.506619', lng: '-96.846997' },
//   terrainSize: 154.16,
//   constructionSize: 0,
//   subdivision: 'LA MOLIENDA',
//   description: 'LOTE 127 MZNA G',
//   mainPhotography: {
//     url: 'https://res.cloudinary.com/civsa/image/upload/v1643481386/propiedades/kqqzxmm6u7xcnhkkdayi.jpg',
//     width: 1280,
//     height: 720,
//     public_id: 'propiedades/kqqzxmm6u7xcnhkkdayi',
//     alt: 'LOTE 127 MZNA G'
//   },
//   morePictures: [
//     {
//       url: 'https://res.cloudinary.com/civsa/image/upload/v1643480683/propiedades/dpobitgtqbqh5jbhrwa9.jpg',
//       width: 1280,
//       height: 720,
//       public_id: 'propiedades/dpobitgtqbqh5jbhrwa9',
//       alt: 'general'
//     }
//   ],
//   services: [],
//   sold: false,
//   showOnweb: true,
//   registrationDate: '2022-01-29T17:12:53.323Z'
// }

// db.casas.find({_id: ObjectId("61f57596a9530ed646a82076")})

// db.casas.find(
//     {
//       showOnweb: { $eq: true },
//       subdivision: { $in: ['LA MOLIENDA', 'OJO DE AGUA', 'Otro', 'null', null] },
//       typeOfProperty: { $eq: "terreno" },
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

// Terrenos

// db.casas.find(
//   {
//     showOnweb: { $eq: true },
//     subdivision: { $in: ['LA MOLIENDA', 'OJO DE AGUA', 'Otro', 'null', null] },
//     typeOfProperty: { $eq: "terreno" },
//   },
//   {
//     title: 1,
//     address: 1,
//     description: 1,
//     mainPhotography: 1,
//     price: 1,
//     _id: 1,
//     rooms: 1,
//     bathrooms: 1,
//     parking: 1,
//     terrainSize: 1,
//   }
// ).limit(20).sort({ registrationDate: -1 })
