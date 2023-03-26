const {
  ingreso,
  registrarUsuario,
  getUsuarios,
  postAvatar,
  logOut,
} = require("../controllers/controllers.usuario");

const router = require("express").Router();

router.post("/ingreso", ingreso);
router.post("/registro", registrarUsuario);
router.get("/traer-usuarios/:id", getUsuarios);
router.post("/post-avatar/:id", postAvatar);
router.get("/logout/:id", logOut);

module.exports = router;
