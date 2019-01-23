const { User, Agendamento } = require("../models");

class AgendamentoController {
	async create(req, res) {
		const provider = await User.findByPk(req.params.provider);
		return res.render("./agendamento/create", { provider });
	}

	async store(req, res) {
		const { id } = req.session.user;
		const { provider } = req.params;
		const { date } = req.body;

		await Agendamento.create({
			user_id: id,
			provider_id: provider,
			date
		});
		return res.redirect("/app/dashboard");
	}
}

module.exports = new AgendamentoController();
