
const fs = require('fs');

function sortResults() {
	fs.readFile(`dfa-invoice.txt`, 'utf8', (err, data) => {
		if (err) throw err;
		const lines = data.trim().split('\n');
		const sorted = lines.sort((a, b) => {
			const aDate = new Date(a.split('\t')[0]);
			const bDate = new Date(b.split('\t')[0]);
			return aDate - bDate;
		});
		fs.writeFile(`dfa-invoice.txt`, sorted.join('\n'), () => {
			console.log(`results sorted`);
		});
	});

}
sortResults();