module.exports = (sequelize, datatypes) => {
	const agendamento = sequelize.define("Agendamento", {
		date: datatypes.DATE
	});

	agendamento.associate = models => {
		agendamento.belongsTo(models.User, { foreignKey: "user_id" });
		agendamento.belongsTo(models.User, { foreignKey: "provider_id" });
	};

	return agendamento
};
