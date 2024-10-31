const cheerio = require('cheerio')
const fs = require('fs')

function replaceHours() {
	const replacements = [
		{ pattern: /ov$/g, replacement: '0.5' },
		{ pattern: /iiiii$/g, replacement: '5' },
		{ pattern: /iiii$/g, replacement: '4' },
		{ pattern: /iii$/g, replacement: '3' },
		{ pattern: /ii$/g, replacement: '2' },
		{ pattern: /i$/g, replacement: '1' },
		// Add more patterns as needed
	]

	fs.readFile('dfa-invoice.txt', 'utf8', (err, data) => {
		if (err) {
			console.error('Error reading file:', err)
			return
		}

		// Apply each replacement
		let modifiedData = data
		replacements.forEach(({ pattern, replacement }) => {
			modifiedData = modifiedData.replace(pattern, replacement)
		})

		// Write the modified data back to the file
		fs.writeFile('dfa-invoice-final.txt', modifiedData, 'utf8', err => {
			if (err) {
				console.error('Error writing file:', err)
			} else {
				console.log('File successfully updated!')
			}
		})
	})
}

replaceHours()
