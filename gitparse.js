
const fs = require('fs');
const { gitlog, convertToNormalTime } = require('./src/helpers');
const jsonData = require('./src/dfa-invoice-git-response.json');
function clear() {
	fs.truncate(`dfa-invoice.txt`, 0, () => {
		console.log(`results cleared`);
	});
}
clear()

function parseJSONToPlainText(jsonData) {
	const headers = [

		'Date',
		'Issue Number',
		'Project Details',
		'P3 WF No',
		'Hrs',

	];

	const headerRow = headers.join('\t');

	const parsedData = jsonData.map(entry => {

		const target_title = entry.target_title || {};
		const isoTimestamp = entry.created_at || {};
		const normalTime = convertToNormalTime(isoTimestamp);
		const action_name = entry.action_name || {};
		const issueId = entry.note || {};
		const push_data = entry.push_data || {};
		const noteBody = entry.note || {};
		const issueResult = issueId.noteable_iid ? push_data.commit_title : {};



		return [
			normalTime || '',
			target_title || 'no target title',
			action_name || 'no action name',
			
			issueResult || '',
			entry.target_title,
			push_data.commit_title || 'no title',
			/*noteBody.body || '',*/
			entry.action_name,

			entry.project_id,

			entry.id,
			entry.target_id,
			entry.target_iid,
			entry.target_type,
		].join('\t').replace(/\n/g, '___');
	});

	const result = [headerRow, ...parsedData].join('\n');
	return result;
}

// Usage: Pass your JSON data to this function


const plainTextData = parseJSONToPlainText(jsonData);
gitlog(plainTextData);

