const Usuario = require("../models/model.usuario");
const bcrypt = require("bcrypt");

module.exports.registrarUsuario = async (req, res, next) => {
  try {
    const { usuario, email, password } = req.body;
    const usuario_check = await Usuario.findOne({ usuario });
    if (usuario_check) return res.json({ msg: "Usuario ya existe", tipo: "info", status: false });
    const email_check = await Usuario.findOne({ email });
    if (email_check) return res.json({ msg: "Email ya esta en uso", tipo: "info", status: false });
    const hashed_password = await bcrypt.hash(password, 10);
    const user = await Usuario.create({
      email,
      usuario,
      password: hashed_password,
    });
    delete user.password;

    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.ingreso = async (req, res, next) => {
  try {
    const { usuario, password } = req.body;

    const user = await Usuario.findOne({ usuario });

    if (!user) return res.json({ msg: "Usuario no existe", tipo: "info", status: false });
    const ispasswordvalid = await bcrypt.compare(password, user.password);
    if (!ispasswordvalid)
      return res.json({ msg: "Contraseña incorrecta", tipo: "info", status: false });
    delete user.password;
    return res.json(user);
  } catch (ex) {
    next(ex);
  }
};

module.exports.getUsuarios = async (req, res, next) => {
  try {
    const users = await Usuario.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "usuario",
      "avatar_image",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.postAvatar = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const avatar_image = req.body.image;
    const data = await Usuario.findByIdAndUpdate(
      user_id,
      {
        avatar: true,
        avatar_image,
      },
      { new: true }
    );
    return res.json({
      is_set: data.avatar,
      image: data.avatar_image,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "Usuario id es requerido " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
