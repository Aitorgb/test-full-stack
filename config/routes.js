const express = require('express');
const router = express.Router();
const data = require('../bin/data.json');

router.get('/', (req, res, next) => {
	res.render('config', {
		data
	});
});

router.post('/result', (req, res, next) => {
	const { clients } = data;
	const coach = req.body;
	const unassignedClients = [];

	const allCoach = Object.keys(coach).map((name) => {
		return {
			name: coach[name][0],
			valoration: parseFloat(coach[name][1]),
			placesAvailable: parseInt(coach[name][2]),
			clients: []
		};
	});

	const maxReputationCoach = () => {
		return allCoach.reduce(
			(prev, coach) =>
				coach.valoration > prev.valoration && coach.placesAvailable > coach.clients.length ? coach : prev,
			{ valoration: 0, clients: unassignedClients }
		);
	};
	const minReputationCoach = () => {
		return allCoach.reduce(
			(prev, coach) =>
				coach.valoration < prev.valoration && coach.placesAvailable > coach.clients.length ? coach : prev,
			{ valoration: 10, clients: unassignedClients }
		);
	};

	const clientInOrder = clients
		.sort((a, b) => b.reputationCoach - a.reputationCoach)
		.filter((client) => client.reputationCoach >= 3);
	const clientInOrderMinFive = clients
		.sort((a, b) => a.reputationCoach - b.reputationCoach)
		.filter((client) => client.reputationCoach < 3);

	clientInOrder.forEach((client) => {
		const coachWithMaxReputation = maxReputationCoach();
		const clientSatisfation = (coachWithMaxReputation.valoration * 2 / client.reputationCoach).toFixed(2);
		client.satisfation = clientSatisfation > 1 ? 1 : parseFloat(clientSatisfation);
		coachWithMaxReputation.clients.push(client);
	});

	clientInOrderMinFive.forEach((client) => {
		const coachWithMinReputation = minReputationCoach();
		const clientSatisfation = (coachWithMinReputation.valoration * 2 / client.reputationCoach).toFixed(2);
		client.satisfation = clientSatisfation > 1 ? 1 : parseFloat(clientSatisfation);
		coachWithMinReputation.clients.push(client);
	});

	allCoach.map((l) => console.log(l));
	const clientsSatisfied = allCoach.map((coach) =>
		coach.clients.reduce((prev, client) => (client.satisfation > 0.9 ? prev + 1 : prev), 0)
	).reduce((prev, coach) => prev + coach, 0);



	res.render('result', { coach: allCoach, totalClients: clients.length, unassignedClients, clientsSatisfied });
});

module.exports = router;
