import Reserve from '../models/Reserve';

class ReserveController {
  async store(req, res) {
    try {
      const { user_id } = req.headers;
      const { house_id } = req.params;
      const { date } = req.body;

      const reserve = await Reserve.create({
        user: user_id,
        house: house_id,
        date,
      });
      res.json(reserve);
    } catch (error) {
      res.status(404).json({ msg: error });
    }
  }
}

export default new ReserveController();
