const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

app.use('/css', express.static(path.join(__dirname, 'css'), { 'extensions': ['css'] }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
    const answer1 = req.body.question1;
    const answer2 = req.body.question2;
    const answer3 = req.body.question3;
    const answer4 = req.body.question4;
    const answer5 = req.body.question5;

    // Create an object with the answers.
    const answers = {
        question1: answer1,
        question2: answer2,
        question3: answer3,
        question4: answer4,
        question5: answer5,
    };

    // Check if the answer to question 4 is higher than 150 or less than or equal to 150.
    if (answer4 > 150) {
        answers.group = 3; // Assign the user to Group 3.
    } else {
        answers.group = 2; // Assign the user to Group 2 for answers less than or equal to 150.
    }

    const answersJSON = JSON.stringify(answers, null, 2);

    // Specify the path to the directory where you want to save the JSON file.
    const directoryPath = path.join(__dirname, 'data'); // 'data' is the directory name
    const timestamp = Date.now(); // Generate a unique timestamp
    const filename = `user_answers_${timestamp}.json`; // Include the timestamp in the filename
    const filePath = path.join(directoryPath, filename);

    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
    }

    // save the answers to a JSON file 
    try {
        fs.writeFileSync(filePath, answersJSON);

        let responseMessage = 'answers submitted.';
        if (answers.group === 3) {
            responseMessage += ' You have been placed in Group 3.';
        } else if (answers.group === 2) {
            responseMessage += ' You have been placed in Group 2.';
        }

        res.send(responseMessage);
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Error saving data to user_answers.json.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


//when user enters their answers, place their answers into a group, then place them in a group that corresponds to their answers
//then displays them onto an HTML page