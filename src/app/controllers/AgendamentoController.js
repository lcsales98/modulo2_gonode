const { User } = require("../models");

class AgendamentoController {
	async create(req, res) {
		const provider = await User.findByPk(req.params.provider);
		return res.render("./agendamento/create", { provider });
	}
}

module.exports = new AgendamentoController();
