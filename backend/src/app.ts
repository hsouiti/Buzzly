import express  from 'express';
import authRoutes from './routes/auth-routes'
const app = express();

app
.disable('x-powered-by')
.use(express.json())
.use(express.urlencoded());


// routes
// auth 
app.use('/api/v1/auth', authRoutes);


//home
 app.get('/api/v1', (req, res) => {
    res.send('Api version 1.0');
}); 

app.use((req, res) => {
     res.status(404).send("404 - Route not found");
});

export default app;