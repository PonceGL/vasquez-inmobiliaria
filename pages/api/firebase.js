const admin = require("firebase-admin");

const deleteImage = async (req, res) => {
  if (req.method === "GET") {
    admin
      .auth()
      .listUsers(100)
      .then((listUsersResult) => {
        res.status(200).json({
          name: `Firebase`,
          method: req.method,
          users: listUsersResult.users,
        });
      })
      .catch((error) => {
        console.log("Error listing users:", error);
      });
  } else if (req.method === "POST") {
    admin
      .auth()
      .updateUser(req.body.id, req.body.action)
      .then(() => {
        res.status(200).json({
          name: "Actualizar uauario",
          message: "Usuario actualizado con éxito",
          status: true,
        });
      })
      .catch((error) => {
        console.log("Error al actualizar el usuario:", error);
        res.status(409).json({
          name: "Actualizar uauario",
          message: "Error al actualizar el usuario",
          status: false,
          error,
        });
      });
  }
};

export default deleteImage;
