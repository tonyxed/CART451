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

    
    if (answer4 > 150 && answer5 === 'yes') {
        answers.group = 1; 
    } else if (answer4 <= 150 && answer5 === 'yes') {
        answers.group = 2; 
    } else if (answer4 > 150 && answer5 === 'no') {
        answers.group = 3; 
    } else {
        answers.group = 4; 
    }

    const answersJSON = JSON.stringify(answers, null, 2);


    const directoryPath = path.join(__dirname, 'data'); 
    const timestamp = Date.now(); 
    const filename = `user_answers_${timestamp}.json`; 
    const filePath = path.join(directoryPath, filename);

    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
    }

    // Save the answers to a JSON file
    try {
        fs.writeFileSync(filePath, answersJSON);

        let responseMessage = 'Answers submitted.';
        if (answers.group === 1) {
            responseMessage += ' You have been placed in Group 1.';
        } else if (answers.group === 2) {
            responseMessage += ' You have been placed in Group 2.';
        } else if (answers.group === 3) {
            responseMessage += ' You have been placed in Group 3.';
        } else {
            responseMessage += ' You have been placed in Group 4.';
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