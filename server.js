const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const templatePath = path.join(__dirname, 'response.html');
const template = fs.readFileSync(templatePath, 'utf8');

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
    const answer6 = req.body.question6;

   
    const answers = {
        question1: answer1,
        question2: answer2,
        question3: answer3,
        question4: answer4,
        question5: answer5,
        question6: answer6,
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

        // render the "response.html" template with user answers
        const renderedHtml = template
            .replace('{{answer1}}', answers.question1)
            .replace('{{answer2}}', answers.question2)
            .replace('{{answer3}}', answers.question3)
            .replace('{{answer4}}', answers.question4)
            .replace('{{answer5}}', answers.question5)
            .replace('{{answer6}}', answers.question6)
            .replace('{{group}}', answers.group);

        res.send(renderedHtml);

    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Error saving data to user_answers.json.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//https://stackoverflow.com/questions/70407169/saving-user-input-in-json-file
//https://stackoverflow.com/questions/72574889/how-do-i-save-the-inputs-of-an-html-form-into-a-json-file-with-javascript

