const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USERS}:${process.env.DB_PASS}@cluster0.xf1yv4o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // const connection
        // await client.connect();

        const userCollections = client.db('jobNestUsers').collection('users');
        const tasksCollections = client.db('jobNestUsers').collection('jobNestsTask');

        // Get all users
        app.get('/users', async (req, res) => {
            const result = await userCollections.find().toArray();
            res.send(result);
        });

        // Add new user
        app.post('/users', async (req, res) => {
            const newUsers = req.body;
            console.log(newUsers);
            const result = await userCollections.insertOne(newUsers);
            res.send(result);
        });

        // Update user sign-in time
        app.patch('/users', async (req, res) => {
            const { email, lastSignInTime, uid, displayName, photoURL } = req.body;
            console.log(email);

            const filter = { email };
            const updatedDoc = {
                $set: {
                    uid,
                    email,
                    displayName,
                    photoURL,
                    lastSignInTime
                }
            };

            const options = { upsert: true }; // 🔥 this creates the user if not found

            const result = await userCollections.updateOne(filter, updatedDoc, options);
            res.send(result);
        });


        // Get all tasks
        app.get('/tasks-nest', async (req, res) => {
            const result = await tasksCollections.find().toArray();
            res.send(result);
        });

        // deadline: new Date(req.body.deadline)
        //  post method
        app.post('/tasks-nest', async (req, res) => {
            const newTask = {
                ...req.body,
                createdAt: new Date(),
                formateDate: new Date(req.body.formateDate)
            };
            console.log(req.body.formateDate);
            console.log(newTask);
            const result = await tasksCollections.insertOne(newTask);
            res.send(result);
        });

        //  Get 6 data
        app.get('/tasks-nest/sorted', async (req, res) => {
            const result = await tasksCollections
                .find()
                .sort({ formateDate: -1 })
                .limit(8)
                .toArray();
            res.send(result);
        });

        // GET /tasks-nest/sort?order=asc&sortBy=formateDate
        app.get('/tasks-nest/sort', async (req, res) => {
            const { order = 'desc', sortBy = 'formateDate' } = req.query;
            const sortDirection = order === 'asc' ? 1 : -1;

            try {
                const result = await tasksCollections
                    .find({})
                    .sort({ [sortBy]: sortDirection })
                    .toArray();

                console.log(`Sorting by ${sortBy} in ${order} order`);
                res.send(result);
            } catch (error) {
                console.error('Sorting error:', error);
                res.status(500).send({ error: 'Failed to sort tasks.' });
            }
        });

        // get highest bid first
        app.get('/tasks-nest/highest-bid', async (req, res) => {
            const limit = parseInt(req.query.limit) || 6; // default to 6 if not passed

            const result = await tasksCollections
                .find()
                .sort({ bids: -1 }) // sort by highest bids
                .limit(limit)       // return only limited number of results
                .toArray();

            res.send(result);
        });


        //  Get task by ID
        app.get('/tasks-nest/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await tasksCollections.findOne(query);
            res.send(result);
        });

        // Update full task
        app.put('/tasks-nest/:id', async (req, res) => {
            const id = req.params.id;
            console.log(req.body.formateDate);
            const updatedData = {
                ...req.body,
                formateDate: new Date(req.body.formateDate)
            };
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = { $set: updatedData };
            const result = await tasksCollections.updateOne(filter, updatedDoc, options);
            res.send(result);
        });

        //  Patch bids for added bids
        app.patch('/tasks-nest/:id', async (req, res) => {
            const id = req.params.id;
            const { bids } = req.body;
            const query = { _id: new ObjectId(id) };
            const updatedDoc = { $set: { bids } };
            const result = await tasksCollections.updateOne(query, updatedDoc);
            res.send(result);
        });

        //  Delete task
        app.delete('/tasks-nest/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await tasksCollections.deleteOne(query);
            res.send(result);
        });

        // MongoDB Ping
        await client.db("admin").command({ ping: 1 });
        console.log(" MongoDB connected successfully!");
    } finally {
        // await client.close(); // Keep commented in production
    }
}
run().catch(console.dir);

// Root route
app.get('/', (req, res) => {
    res.send('Freelancing Task Marketplace Server is running...');
});

//  Start server
app.listen(port, () => {
    console.log(` Server is running on port ${port}`);
});
