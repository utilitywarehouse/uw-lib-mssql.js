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
			connection.emit('connected');
		}).catch(err => {
			if (!connected) {
				return;
			}
			connected = false;
			connection.emit('disconnected');
		})
	}, interval * 1000)

	connection.on('connect', function() {
		connectionCheck();
	});

	return connection;
};

module.exports = factory;
