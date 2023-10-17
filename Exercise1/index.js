const port = 4000;
const express = require('express'); 
const app = express();
const {MongoClient} = require('mongodb');
const url = 'mongodb+srv://tonylul:Anthonyrocks1@cluster0.xlbfsyv.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';
const databaseName = 'Exercise1';
const cors = require('cors');

app.use(express.json());
app.use(cors()); 


// app.get('/search', async (req, res) => {
//   const minVotes = req.query.votes;

//   const client = new MongoClient(url);
//     try{
//         await client.connect();
//         const db = client.db(databaseName);
//         console.log("success");
//         let ref_db = await client.db("Exercise1");
//         let movieReviews = await ref_db.collection("Movies");
//         const query1 = await movieReviews.find({}).toArray(); //finds all movies inside the database
//         console.log('Documents:');
//         console.log(query1);
//         const query2 = await movieReviews.countDocuments(); //counts the number of movies in the database
//         console.log('Total movies inthe database:');
//         console.log(query2);
//         const query3 = await movieReviews.find({ 'Votes': { $gte: Number(minVotes) } }).toArray(); // find movies sorted by a specific field
//         console.log('Documents:');
//         console.log(query3);
//         const query4 = await movieReviews.find({'MetaScore':{$gt:70}}).toArray(); // finds all movies with a metascore of greater than 70
//         console.log('Documents:');
//         console.log(query4);
//         const query5 = await movieReviews.find({'Movie Rating':{$lt:5}}).toArray(); // finds all movies with a rating of less than 5
//         console.log('Documents:');
//         res.json(query3);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('An error occurred');
//     } finally {
//       await client.close();
//     }
// });

app.get('/search', async (req, res) => {
    const minVotes = parseInt(req.query.votes);
    const minMetascore = parseInt(req.query.metascore);

    try {
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(databaseName);
        const movieReviews = db.collection("Movies");

        const query1 = await movieReviews.find({ 'Votes': { $gte: minVotes } }).toArray();  //finds all movies inside the database with a vote count sent by the user
        console.log('Server response:', query1);
        res.json(query1);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
});

app.get('/searchMetascore', async (req, res) => {
    const minMetascore = parseInt(req.query.metascore);

    try {
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(databaseName);
        const movieReviews = db.collection("Movies");

        const query = await movieReviews.find({ 'MetaScore': { $gte: minMetascore } }).toArray(); //finds all movies inside the database with a metascore higher than what the user searched
        console.log('Server response:', query);
        res.json(query);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
});


app.listen(port, () => {
    console.log(`Server is running`);
  });
