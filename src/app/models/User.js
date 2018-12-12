const bcrypt = require('bcryptjs');

module.exports = (sequelize, datatypes) => {
	const User = sequelize.define('User', {
		name: datatypes.STRING,
		email: datatypes.STRING,
		avatar: datatypes.STRING,
		password: datatypes.VIRTUAL,
		password_hash: datatypes.STRING,
		provider: datatypes.BOOLEAN,
	}, {
		hooks: {
			beforeSave: async user => {
				if(user.password) {
					user.password_hash = await bcrypt.hash(user.password, 8)
				}
			}
		},
	});

	User.prototype.authentication = function (password) {
		return bcrypt.compare(password, this.password_hash);
	}

	return User;
};
