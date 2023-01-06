require('dotenv').config();
const axios = require('axios');
const sinceDate = process.argv[2]; // YYYY-MM-DDTHH:MM:SSZ 2022-12-01
const authAPIKey = process.env.authAPIKey;
const user = process.env.user;
const userId = process.env.userId;

const GITLAB_BASE_URL = 'https://gitlab.com/api/v4';


async function getCommits(authAPIKey, user, sinceDate) {
	try {
		// Set up headers for request with API key for authentication
		const headers = {
			'Private-Token': authAPIKey
		};

		// Set up query params to filter by user and since date
		const params = {
			username: user,
			since: sinceDate
		};

		// Make request to GitLab API to get all commits
		const response = await axios.get('https://gitlab.com/api/v4/commits', { headers, params });

		// Return array of commits with stats
		return response.data.map(commit => ({
			id: commit.id,
			message: commit.message,
			additions: commit.stats.additions,
			deletions: commit.stats.deletions,
			total: commit.stats.total
		}));
	} catch (error) {
		console.error(error);
	}
}

// Example usage
getCommits(authAPIKey, user, sinceDate)
	.then(commits => console.log(commits));
