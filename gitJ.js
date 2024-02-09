
const fs = require('fs');
const { gitlog, convertToNormalTime } = require('./src/helpers');
const jsonData = require('./src/dfa-invoice-git-response.json');
const { join } = require('path');
function clear() {
  fs.truncate(`dfa-invoice.txt`, 0, () => {
    console.log(`results cleared`);
  });
}
clear()


function processData(jsonData) {
  // Arrays to store pushes and comments
  let finalArray = [];
  let pushedTo = [];
  // Filtering and populating final array
  jsonData.forEach(item => {

    const isoTimestamp = item.created_at;
    const normalTime = convertToNormalTime(isoTimestamp);


    //push events
    if (item.action_name === 'pushed to' && item.push_data.commit_title.includes('|')) {
      finalArray.push({
        Time: normalTime,
        Issue: item.push_data.commit_title.match(/\#\d{1,}/),
        Repository: `=INDIRECT(ADDRESS(ROW() - 1, COLUMN() ) )`,
        WF: '=INDIRECT(ADDRESS(ROW() - 1, COLUMN() ) )', // Extracting numeric part
        Hours: item.push_data.commit_title.match(/ \|\w{1,}/), // decode hours this later
      });

      //comment events
    } else if (item.action_name === 'commented on') {
      finalArray.push({
        Time: normalTime,
        Issue: 'blank',
        Repository: item.target_title,
        WF: item.target_title.match(/wf\#?\s?\d{6}/i), // Extracting WF#
        Hours: '' // Placeholder for Hours
      });

    }


  });

  // Formatting the final array for tab-separated values with headers
  let resultArray = [
    ['Time', 'Issue', 'Repo', 'WF#', 'Hours'],
    ...finalArray.map(item => [item.Time, item.Issue, item.Repository, item.WF, item.Hours])
  ];
  resultArray = resultArray.map(item => item.join('\t'));
  return resultArray;
}

// Example usage

const result = processData(jsonData).join('\n');

// Logging the result
gitlog(result.replaceAll('|iiiii', '5').replaceAll('|iiii', '4').replaceAll('|iii', '3').replaceAll('|ii', '2').replaceAll('|i', '1').replaceAll('|ov', '0.5').replaceAll('|d', '4'));


// function processData(jsonData) {
//   // Arrays to store pushes and comments
//   let pushes = [];
//   let comments = [];

//   // Filtering and populating pushes and comments arrays
//   jsonData.forEach(item => {


//     if (item.action_name === 'pushed to' && item.push_data.commit_title.includes('|')) {

//       pushes.push({
//         Time: normalTime,
//         Issue: item.push_data.commit_title.match(/\#\d{1,3}/),
//         Repo: '',
//         WF: '',
//         Hours: item.push_data.commit_title.match(/\|[a-zA-Z]{1,6}/),
//       });

//     } else if (item.action_name === 'commented on') {
//       comments.push({
//         Time: normalTime,
//         Issue: '',
//         Repo: item.target_title,
//         WF: item.target_title.match(/\#\s?wf?\d{6}/), // Extracting WF#
//         Hours: '',
//       });
//     }
//   });

//   // Merging pushes and comments arrays
//   let mergedArray = pushes.join(comments, "\t");

//   // Formatting the final array for tab-separated values with headers
//   let finalArray = [

//     ...mergedArray.map(item => [item.Time, item.Issue, item.Repo, item.WF, item.Hours]),
//   ];

//   //finalArray = finalArray.map(item => item.join('\t'));
//   return finalArray;
// }

// // Example usage

// const result = processData(jsonData);

// // Logging the result
// gitlog(result);
