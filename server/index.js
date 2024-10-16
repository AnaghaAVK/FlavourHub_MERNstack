import express from 'express';
import { connectDB } from './config/db.js';
import { apiRouter } from './routes/index.js';
import cookieparser from "cookie-parser"

const app = express()
const port = 3000


connectDB();

//middleware
app.use(express.json());
app.use(cookieparser());


app.use('/api',apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})