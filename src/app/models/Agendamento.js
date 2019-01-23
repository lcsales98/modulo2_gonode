module.exports = (sequelize, datatypes) => {
	const Agendamento = sequelize.define("Agendamento", {
		date: datatypes.DATE
	});

	Agendamento.associate = models => {
		Agendamento.belongsTo(models.User, { foreignKey: "user_id" });
		Agendamento.belongsTo(models.User, { foreignKey: "provider_id" });
	};

	return Agendamento;
};
