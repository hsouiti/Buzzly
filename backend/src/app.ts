import express  from 'express';
const app = express();

app
.disable('x-powered-by')
.use(express.json())
.use(express.urlencoded());


// routes

app.get('/api/v1', (req, res) => {
    res.send('Hello World!')
});

export default app;