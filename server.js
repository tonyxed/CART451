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

    // Create an object with the answers.
    const answers = {
        question1: answer1,
        question2: answer2,
        question3: answer3,
    };

    const answersJSON = JSON.stringify(answers, null, 2);

    // Specify the path to the directory where you want to save the JSON file.
    const directoryPath = path.join(__dirname, 'data'); // 'data' is the directory name
    const filename = 'user_answers.json'; // You can change the filename if needed
    const filePath = path.join(directoryPath, filename);

    // Create the directory if it doesn't exist.
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
    }

    // Save the answers to a JSON file in the specified directory and handle errors.
    try {
        fs.writeFileSync(filePath, answersJSON);
        res.send('Answers submitted and saved to user_answers.json on the server successfully.');
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Error saving data to user_answers.json.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
