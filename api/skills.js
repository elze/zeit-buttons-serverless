const https = require('https');

module.exports = (req,res) => {
	
	https.get('https://sc2019.skillclusters.com/sc/skills', (resp) => {
	let data = '';

	// A chunk of data has been recieved.
	resp.on('data', (chunk) => {
		data += chunk;
	});

	// The whole response has been received. Print out the result.
	resp.on('end', () => {
		console.log(JSON.parse(data).explanation);
		let transformedData = transformResponse(data);
		res.send({primary_skills: transformedData});
		//res.send(data);
	});

	})	
	
	function transformResponse(data) {
		for (item of data) {
			item["showResult"] = false;
		}
		return data;
	}
		
	/**
    res.send({"primary_skills":
	[{
      "primary_term": "C#",
      "associated_terms": [{
          "number_of_times": 25,
          "ratio": "0.250",
          "secondary_term": "linq"
      }, 
      {
          "number_of_times": 49,
          "ratio": "0.49",
          "secondary_term": "jquery"
      },
      {
          "number_of_times": 119,
          "ratio": "1.19",
          "secondary_term": "asp.net"
      },
      {
          "number_of_times": 92,
          "ratio": "0.92",
          "secondary_term": "sql server"
      }],
      "showResult": false
      },
      {
      "primary_term": "java",
      "associated_terms": [{
          "number_of_times": 72,
          "ratio": "0.72",
          "secondary_term": "jersey"
      }, 
      {
          "number_of_times": 65,
          "ratio": "0.65",
          "secondary_term": "javascript"
      },
      {
          "number_of_times": 34,
          "ratio": "0.34",
          "secondary_term": "scala"
      },
      {
          "number_of_times": 43,
          "ratio": "0.43",
          "secondary_term": "oracle"
      },
      {
          "number_of_times": 42,
          "ratio": "0.42",
          "secondary_term": "tomcat"
      }
      ],
      "showResult": false
      },
      {
      "primary_term": "iOS",
      "associated_terms": [{
          "number_of_times": 57,
          "ratio": "0.57",
          "secondary_term": "cocoa"
      }, 
      {
          "number_of_times": 29,
          "ratio": "0.55",
          "secondary_term": "react native"
      },
      {
          "number_of_times": 35,
          "ratio": "0.35",
          "secondary_term": "xcode"
      }
      ],
      "showResult": false
      }
    ]
	})
	***/
}