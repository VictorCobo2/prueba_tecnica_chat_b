const Mensaje = require("../models/model.msg");
const Usuario = require("../models/model.usuario");

module.exports.getMsgs = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Mensaje.find({
      users: {
        $all: [from, "1"],
      },
    }).sort({ updatedAt: 1 });

    const enviar_mensajes = await Promise.all(
      messages.map(async (msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.msg.text,
          usuario: await buscarUsuario(msg),
        };
      })
    );

    res.json(enviar_mensajes);
  } catch (ex) {
    next(ex);
  }
};
const buscarUsuario = async (msg) => {
  const usuario = await Usuario.find({
    _id: msg.usuarios[0],
  });

  return usuario[0];
};

module.exports.postMsg = async (req, res, next) => {
  try {
    const { from, to, msg } = req.body;

    const data = await Mensaje.create({
      msg: { text: msg },
      usuarios: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Mensaje enviado correctamente." });
    else return res.json({ msg: "Fallo enviando mensaje" });
  } catch (ex) {
    next(ex);
  }
};
