const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    res.sendFile(__dirname + '/main.html');
});

app.post('/submit', (req, res) => {
    const answer1 = req.body.question1;
    const answer2 = req.body.question2;
    const answer3 = req.body.question3;

    // Create an object with the answers.
    const answers = {
        question1: answer1,
        question2: answer2,
        question3: answer3,
    };


    const answersJSON = JSON.stringify(answers);

    // Save the answers to a JSON file.
    fs.writeFileSync('answers.json', answersJSON);

    // Send the confirmation message as a response.
    res.send('Answers submitted and saved successfully.');

});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

