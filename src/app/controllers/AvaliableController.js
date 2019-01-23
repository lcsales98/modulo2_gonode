const moment = require("moment");
const { Agendamento } = require("../models");
const { Op } = require("sequelize");

class AvaliableController {
	async index(req, res) {
		const date = moment(parseInt(req.query.date));

		const agendamentos = await Agendamento.findAll({
			where: {
				provider_id: req.params.provider,
				date: {
					[Op.between]: [
						date.startOf("day").format(),
						date.endOf("day").format()
					]
				}
			}
		});

		const horarios = [
			"8:00",
			"9:00",
			"10:00",
			"11:00",
			"12:00",
			"13:00",
			"14:00",
			"15:00",
			"16:00",
			"17:00",
			"18:00"
		];

		const available = horarios.map(time => {
			const [hour, minute] = time.split(":");
			const value = date
				.hour(hour)
				.minute(minute)
				.second(0);

			return {
				time,
				value: value.format(),
				available:
					value.isAfter(moment()) &&
					!agendamentos.find(a => moment(a.date).format("HH:mm") === time)
			};
		});

		return res.render("available/index", { available });
	}
}

module.exports = new AvaliableController();
