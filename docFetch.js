const fs = require('fs');
const fetch = require('node-fetch');
const url = 'https://npiregistry.cms.hhs.gov/api/?enumeration_type=NPI-1&taxonomy_description=Physician%20Assistant&state=fl&limit=20&skip=&pretty=on&version=2.1';


(async () => {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const data = await response.json();
		console.log(data.results);
		return data;
	} catch (error) {
		console.error('Error:', error);
	}
})();



