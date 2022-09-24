import Reserve from '../models/Reserve';
import User from '../models/User';
import House from '../models/House';
class ReserveController {
  async store(req, res) {
    try {
      const { user_id } = req.headers;
      const { house_id } = req.params;
      const { date } = req.body;

      const house = await House.findById(house_id);
      if (!house) {
        return res.status(404).json({ error: 'Essa casa não existe' });
      } else if (house.status !== true) {
        return res.status(400).json({ error: 'Solicitação indisponível' });
      }

      const user = await User.findById(user_id);
      if (String(user._id) === String(house.user)) {
        return res.status(401).json({ error: 'Reserva não permitida' });
      }

      const reserve = await Reserve.create({
        user: user_id,
        house: house_id,
        date,
      });

      const populatedReserve = await Reserve.findOne({ _id: reserve._id })
        .populate('house')
        .populate('user')
        .exec();

      res.json(populatedReserve);
    } catch (error) {
      res.status(404).json({ msg: error });
    }
  }
}

export default new ReserveController();
