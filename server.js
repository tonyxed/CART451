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
    const answer7 = req.body.question7;

    const answers = {
        question1: answer1,
        question2: answer2,
        question3: answer3,
        question4: answer4,
        question5: answer5,
        question6: answer6,
        question7: answer7,
    };

    // determine the group based on the given conditions
if (answer7.toLowerCase() === 'lose weight' && answer6.toLowerCase() === 'yes' && answer4.toLowerCase() === 'no') {
    answers.group = 1;  
} else if (answer7.toLowerCase() === 'maintain weight' && answer6.toLowerCase() === "no" && answer3.toLowerCase() === 'no') {
    answers.group = 2;
} else if (answer7.toLowerCase() === 'gain weight' && answer6.toLowerCase() === "yes" && answer3.toLowerCase() === 'yes') {
    answers.group = 3;
} else if (answer2 >= 18 && answer3.toLowerCase() === 'yes') {
    answers.group = 4; 
} else if (answer4.toLowerCase() === 'yes' && answer6.toLowerCase() === 'no') {
    answers.group = 5; 
} else if (answer7.toLowerCase() === 'lose weight' && answer6.toLowerCase() === "no" && answer3.toLowerCase() === 'yes' && answer4.toLowerCase() === 'yes') {
    answers.group = 6;
} else if (answer4.toLowerCase() === 'no' && answer6.toLowerCase() === 'yes' && answer3.toLowerCase() === 'yes') {
    answers.group = 7; 
} else if (answer2 > 30 && answer7.toLowerCase() === 'gain weight' && answer6.toLowerCase() === 'yes' && answer3.toLowerCase() === 'yes') {
    answers.group = 8; 
} else if (answer3.toLowerCase() === 'no' && answer4.toLowerCase() === 'no' && answer6.toLowerCase() === 'no' && answer7.toLowerCase() === "lose weight") {
    answers.group = 9; 
} else if (answer7.toLowerCase() === 'lose weight' && answer6.toLowerCase() === 'yes' && answer4.toLowerCase() === 'no' && answer3.toLowerCase() === "no") {
    answers.group = 10;
} else {
    answers.group = 7 + Math.floor(Math.random() * 4);
}


    const answersJSON = JSON.stringify(answers, null, 2);

    const directoryPath = path.join(__dirname, 'data');
    const timestamp = Date.now();
    const filename = `user_answers_${timestamp}.json`;
    const filePath = path.join(directoryPath, filename);

    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
    }

    try {
        fs.writeFileSync(filePath, answersJSON);

        const renderedHtml = template
            .replace('{{answer1}}', answers.question1)
            .replace('{{answer2}}', answers.question2)
            .replace('{{answer3}}', answers.question3)
            .replace('{{answer4}}', answers.question4)
            .replace('{{answer5}}', answers.question5)
            .replace('{{answer6}}', answers.question6)
            .replace('{{answer7}}', answers.question7)
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
