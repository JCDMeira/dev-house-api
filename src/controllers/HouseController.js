import House from '../models/House';
import User from '../models/User';
import * as Yup from 'yup';
class HouseController {
  async index(req, res) {
    const { status } = req.query;

    const houses = await House.find({ status });

    return res.json(houses);
  }
  async store(req, res) {
    try {
      const { filename } = req.file;
      const { description, price, location, status } = req.body;
      const { user_id } = req.headers;
      const fileNameWithoutSpaces = filename.replace(' ', '');

      const schema = Yup.object().shape({
        description: Yup.string().required(),
        price: Yup.number().required(),
        location: Yup.string().required(),
        status: Yup.boolean().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ msg: 'Falha na validação.' });
      }

      const house = await House.create({
        user: user_id,
        thumbnail: fileNameWithoutSpaces,
        description,
        price,
        location,
        status,
      });

      return res.json(house);
    } catch (error) {
      return res.status(400).json({ msg: `${error}` });
    }
  }

  async update(req, res) {
    try {
      const { filename } = req.file;
      const { house_id } = req.params;
      const { description, price, location, status } = req.body;
      const { user_id } = req.headers;
      const fileNameWithoutSpaces = filename.replace(' ', '');

      const schema = Yup.object().shape({
        description: Yup.string().required(),
        price: Yup.number().required(),
        location: Yup.string().required(),
        status: Yup.boolean().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ msg: 'Falha na validação.' });
      }

      const user = await User.findById(user_id);
      const houses = await House.findById(house_id);

      if (String(user._id) !== String(houses.user)) {
        return res.status(401).json({ msg: 'Não autorizado' });
      }

      await House.updateOne(
        { _id: house_id },
        {
          user: user_id,
          thumbnail: fileNameWithoutSpaces,
          description,
          price,
          location,
          status,
        },
      );

      return res.json({ msg: 'succes' });
    } catch (error) {
      console.log('a');
      return res.status(404).json({ msg: error });
    }
  }

  async destroy(req, res) {
    try {
      const { house_id } = req.body;
      const { user_id } = req.headers;

      const user = await User.findById(user_id);
      const houses = await House.findById(house_id);

      if (String(user._id) !== String(houses.user)) {
        return res.status(401).json({ msg: 'Não autorizado' });
      }

      await House.findOneAndDelete({ _id: house_id });

      return res.json({ msg: 'delete sucess' });
    } catch (error) {
      console.log('a');
      return res.status(404).json({ msg: error });
    }
  }
}

export default new HouseController();
