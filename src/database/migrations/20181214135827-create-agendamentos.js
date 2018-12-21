"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("agendamentos", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			date: {
				allowNull: false,
				type: Sequelize.DATE
			},
			user_id: {
				type: Sequelize.INTEGER,
				references: { model: "users", key: "id" },
				onUpdate: "cascade",
				onDelete: "cascade",
				allowNull: false
			},
			provider_id: {
				type: Sequelize.INTEGER,
				references: { model: "users", key: "id" },
				onUpdate: "cascade",
				onDelete: "cascade",
				allowNull: false
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("agendamentos");
	}
};
