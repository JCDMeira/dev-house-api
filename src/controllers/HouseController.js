import House from '../models/House';
class HouseController {
  async index(req, res) {
    const { status } = req.query;

    const houses = await House.find({ status });

    return res.json(houses);
  }
  async store(req, res) {
    const { filename } = req.file;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;
    const fileNameWithoutSpaces = filename.replace(' ', '');

    const house = await House.create({
      user: user_id,
      thumbnail: fileNameWithoutSpaces,
      description,
      price,
      location,
      status,
    });

    return res.json(house);
  }
}

export default new HouseController();
