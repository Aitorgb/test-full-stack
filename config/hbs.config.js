const hbs = require('hbs');


hbs.registerHelper('add', function(value, options) {
	return parseInt(value) + 1;
});

hbs.registerHelper('isDefined', function(value, options) {
	return value.length >= 1;
});

hbs.registerHelper('clientNotSatisfied', function(clientSatisfied, totalClients) {
	return totalClients - clientSatisfied 
});

hbs.registerHelper('satisfation', (dateCoach, totalClients) => {
	const indexSatisfation = (dateCoach
		.map((coach) => coach.clients.reduce((prev, client) => prev + parseFloat(client.satisfation), 0))
    .reduce((prev, totalForCoach) => prev + totalForCoach, 0) / totalClients).toFixed(2);
    
  return indexSatisfation
});
