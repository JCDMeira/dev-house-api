// metodos: index, show, update, store, destroy
/*
  index: listagem de sessões
  show: listar uma única sessão
  update: atualizar uma sessão
  store: criar uma sessão
  destroy: deletar uma sessão
*/
import User from '../models/User';
import * as Yup from 'yup';

class SessionControler {
  async store(req, res) {
    const { email } = req.body;
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ msg: 'Email inválido' });
    }

    try {
      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({ email });
      }

      return res.json(user);
    } catch (error) {
      return res.json({ message: error });
    }
  }
}

export default new SessionControler();
