const {MongoClient} = require('mongodb');
const url = 'mongodb+srv://tonylul:Anthonyrocks1@cluster0.xlbfsyv.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';
const databaseName = 'Exercise1';

async function run(){
    const client = new MongoClient(url);
    try{
        await client.connect();
        const db = client.db(databaseName);
        console.log("success");
        let ref_db = await client.db("Exercise1");
        let movieReviews = await ref_db.collection("Movies");
        // const query1 = await movieReviews.find({}).toArray(); //finds all movies inside the database
        // console.log('Documents:');
        // console.log(query1);
        // const query2 = await movieReviews.countDocuments(); //counts the number of movies in the database
        // console.log('Total movies inthe database:');
        // console.log(query2);
        // const query3 = await movieReviews.find({'Votes': {$gte:1327069}}).toArray(); // find movies sorted by a specific field
        // console.log('Documents:');
        // console.log(query3);
        // const query4 = await movieReviews.find({'MetaScore':{$gt:70}}).toArray(); // finds all movies with a metascore of greater than 70
        // console.log('Documents:');
        // console.log(query4);
        // const query5 = await movieReviews.find({'Movie Rating':{$lt:5}}).toArray(); // finds all movies with a rating of less than 5
        // console.log('Documents:');
        // console.log(query5);
    }catch(error){

    }finally{
        await client.close();
    }
}

run();