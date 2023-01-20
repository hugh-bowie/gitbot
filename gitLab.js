require('dotenv').config();
const axios = require('axios');
const afterDate = process.argv[2]; // 2022-12-08
const authAPIKey = process.env.authAPIKey;
const user = process.env.user;
const userId = process.env.userId;

const GITLAB_BASE_URL = `https://gitlab.com/api/v4/users/9827304/events?action=pushed&after=1&per_page=1000`;


async function getCommits(authAPIKey, user, afterDate) {
	try {
		// Set up headers for request with API key for authentication
		const headers = {
			'Private-Token': authAPIKey
		};

		// Set up query params to filter by user and since date
		const params = {
			username: user,
			since: afterDate
		};

		// Make request to GitLab API to get all commits

		const response = await axios.get(`https://gitlab.com/api/v4/users/9827304/events?action=pushed,commented&after=${afterDate}&per_page=1000`, { headers });

		//const events = await JSON.stringify(response.data);

		const allEvents = await response.data.map(events => ({

			id: events.id,
			action: events.action_name, //pushed or commented on
			date: events.created_at,
			targetTitle: events.target_title,

		}));

		if (allEvents.action_name === 'pushed to') {
			const pushvents = await allEvents.map(push => ({
				id: push.id,
				date: push.created_at,
				commitTitle: push.push_data.commit_title,

			}));
			console.table(pushvents);
		}
		//const commentEvents = await allEvents.filter(allEvents.action_name === 'commented on');


		//console.table(commentEvents);



		// const events = await response.data.map(event => ({
		// 	id: event.id,
		// 	projectId: event.project_id, //13016320
		// 	action: event.action_name //pushed or commented on
		// 	/*pushes, comments */
		// }));

		// const pushes = await events.filter(events.action_name === 'pushed to')
		// pushes.map(push => ({
		// 	Issue: push.push_data.commit_title,/*.match(/(\#\n+)/)*/
		// 	Message: push.push_data.commit_title,/*.replace(/(\#\n+)/, '').replace(/(\|[iov]+)/g, '')*/
		// 	Hours: push.push_data.commit_title,/*.match(/(\|[iov]+)/g),*/
		// }));

		// const comments = await events.filter(events.action_name === 'commented on');
		// comments.map(comment => ({
		// 	project_id: comment.project_id,
		// 	target_title: comment.target_title,
		// 	wfNo: comment.target_title/*.match(/([wf#]\n(6))/g)*/,
		// 	Date: comment.created_at.toLocaleString(),
		// }));


		// return [events, comments, pushes];
	}

	catch (error) {
		console.error(error);
	}
}

// Example usage
getCommits(authAPIKey, user, afterDate)
	//.then(log => console.table(log));
	// .then(comments => console.table(comments))
	// .then(pushes => console.table(pushes));
