const mssql = require('mssql');

function factory(options, {interval = 10} = {}) {
	const connection = new mssql.Connection(options);
	connection.connect = connection.connect.bind(connection);

	let connected = false;

	const connectionCheck = () => setInterval(() => {
		new mssql.Request(connection).query("SELECT 1").then(() => {
			if (connected) {
				return;
			}
			connected = true;
		}).catch(err => {
			if (!connected) {
				return;
			}
			connected = false;
			connection.emit('disconnect', err);
		})
	}, interval * 1000)

	connection.on('connect', function() {
		connected = true;
		connectionCheck();
	});

	return connection;
};

module.exports = factory;
