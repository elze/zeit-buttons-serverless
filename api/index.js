const app = require('express')()
const { v4 } = require('uuid')
const bodyParser = require('body-parser')
app.use(bodyParser.json());

const https = require('https');
const http = require('http');

// To run this server locally, uncomment the line below. It is commented out to deploy this app on Vercel.

app.set('port', (process.env.PORT || 8081));


app.get('/api/skills', (req, res) => {
	//https.get('https://sc2019.skillclusters.com/sc/skills', (resp) => {
	http.get('http://sc2018.skillclusters.com/sc/skills', (resp) => {		
		let data = '';

		// A chunk of data has been received.
		resp.on('data', (chunk) => {
			data += chunk;
		});

		// The whole response has been received. Print out the result.
		resp.on('end', () => {
			const dataJson = JSON.parse(data);
			const transformedSkills = dataJson.map(primarySkill => {
				primarySkill.totalCount = primarySkill.associated_terms.length;
				let associated_terms_sorted = primarySkill.associated_terms.sort((a, b) => parseFloat(b.ratio) - parseFloat(a.ratio));
				if (associated_terms_sorted.length > 10) {
					const indLessThan02 = associated_terms_sorted.findIndex(x => parseFloat(x.ratio) <= 0.2);
					const cutOffIndex = indLessThan02 > 10 ? indLessThan02 : 10;
					associated_terms_sorted.splice(cutOffIndex);
				}
					
				primarySkill.associated_terms = associated_terms_sorted;
				return primarySkill;
			});
			//console.log("About to send all the skills");
			res.send({primary_skills: transformedSkills});
		});
	});
})

app.get('/api/primarySkill/:skillName', (req, res) => {
	//https.get('https://sc2019.skillclusters.com/sc/skills', (resp) => {
	const { skillName } = req.params		
	http.get('http://sc2018.skillclusters.com/sc/skills', (resp) => {		
		let data = '';

		// A chunk of data has been received.
		resp.on('data', (chunk) => {
			data += chunk;
		});

		// The whole response has been received. Print out the result.
		resp.on('end', () => {
			console.log(JSON.parse(data).explanation);
			//res.send({primary_skills: transformedData});
			const dataJson = JSON.parse(data);
			const primarySkill = dataJson.find(x => x.primary_term.toLowerCase() === skillName.toLowerCase());
			let associated_terms_sorted = primarySkill.associated_terms.sort((a, b) => parseFloat(b.ratio) - parseFloat(a.ratio));					
			primarySkill.associated_terms = associated_terms_sorted;			
			//console.log(`/api/primarySkill/:skillName: ${JSON.stringify(primarySkill)}`);
			res.send(primarySkill);
		});
	});
})


app.get('/api/structskills', (req, res) => {
	https.get('https://sc2019.skillclusters.com/sc/structskills', (resp) => {
		let data = '';

		// A chunk of data has been received.
		resp.on('data', (chunk) => {
			data += chunk;
		});

		// The whole response has been received. Print out the result.
		resp.on('end', () => {
			//console.log(JSON.parse(data).explanation);
			res.send({primary_skills: JSON.parse(data)});
		});
	});
})

app.get('/api/jobsPerSkillPair/:id', (req, res) => {
	const { id } = req.params
	//https.get(`https://sc2019.skillclusters.com/sc/jobsPerSkillPair/${id}`, (resp) => {
	http.get(`http://sc2018.skillclusters.com/sc/jobsPerSkillPair/${id}`, (resp) => {		
		let data = '';

		// A chunk of data has been received.
		resp.on('data', (chunk) => {
			data += chunk;
		});

		// The whole response has been received. Print out the result.
		resp.on('end', () => {
			//console.log(JSON.parse(data).explanation);
			res.send(JSON.parse(data));
		});
	});
})


// To run this server locally, uncomment the code block below. It is commented out to deploy this app on Vercel.

app.listen(app.get('port'), function() {
  console.log('Express app zeit-buttons-serverless is running on port', app.get('port'));
});


module.exports = app