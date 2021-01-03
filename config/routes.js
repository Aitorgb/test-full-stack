const express = require('express');
const router = express.Router();
const data = require('../bin/data.json');

router.get('/', (req, res, next) => {
	res.render('config', {
		data
	});
});
router.post('/result', (req, res, next) => {
	let { clients } = data;
	const coach = req.body;
	const allCoach = Object.keys(coach).map((name) => {
		return {
			name: coach[name][0],
			valoration: parseFloat(coach[name][1]),
			placesAvailable: parseInt(coach[name][2]),
			clients: []
		};
	});
	const clientWithMaxReputation = clients.reduce(
		(prev, client) => (client.reputationCoach > prev.reputationCoach ? client : prev)
	);
	console.log(allCoach);
	// console.log(allCoach, clients);
	while (clients.length > 0) {
		const clientWithMaxReputation = clients.reduce(
			(prev, client) => (client.reputationCoach > prev.reputationCoach ? client : prev)
		);

		if (clientWithMaxReputation.reputationCoach >= 7.5) {
			const coachWithMaxReputation = allCoach.reduce(
				(prev, coach) =>
					coach.valoration > prev.valoration && coach.placesAvailable > coach.clients.length ? coach : prev,
				{ valoration: 0 }
			);
			console.log(coachWithMaxReputation.clients.length);
			coachWithMaxReputation.clients.push(clientWithMaxReputation);
		} else if (clientWithMaxReputation.reputationCoach >= 5) {
			const coachWithGoodReputation = allCoach.reduce(
				(prev, coach) =>
					coach.valoration > 2.5 &&
					coach.valoration < 3.5 &&
					coach.valoration > prev.valoration &&
					coach.placesAvailable > coach.clients.length
						? coach
						: prev,
				{ valoration: 2.5 }
			);
			coachWithGoodReputation.clients.push(clientWithMaxReputation);
		} else if (clientWithMaxReputation.reputationCoach >= 0) {
			const coachWithMinReputation = allCoach.reduce(
				(prev, coach) =>
					coach.valoration < prev.valoration && coach.placesAvailable > coach.clients.length ? coach : prev,
				{ valoration: 10 }
			);
			coachWithMinReputation.clients.push(clientWithMaxReputation);
		}
		clients = clients.filter((client) => client.name !== clientWithMaxReputation.name);
	}

	allCoach.map((l) => console.log(l));

	res.render('result');
});

// router.get('/auth/google/callback', sessionMiddleware.isNotAuthenticated, usersController.doSocialLoginGoogle);

module.exports = router;
