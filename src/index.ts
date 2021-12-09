import express from "express";
import dotenv from 'dotenv'
import { connectDB } from "./db/connect";
const app = express()
dotenv.config()
app.use(express.json())

//Routes



//Middleware




app.get('/', (req, res) => {
    res.send('Ola, mundo')
})


//Error Handler
import { notFound } from "./middleware/notFound";
app.use(notFound)




const port = process.env.PORT || 3000;

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };

  start()