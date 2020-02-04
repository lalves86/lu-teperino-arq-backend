const jwt = require('jsonwebtoken');
const Yup = require('yup');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');
const authConfig = require('../config/auth');

module.exports = {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });

    if(!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const passwordCheck = await bcrypt.compare(password, usuario.password_hash);

    if(!passwordCheck) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const { id, nome } = usuario;

    return res.json({
      user: {
        id,
        nome,
        email
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}