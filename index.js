import Sales from './models/Sales.js'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

dotenv.config()
const app = express()
const port = 3000

const dbUrl = process.env.DB_URL
const connect = async () => {
   try {
      await mongoose.connect(dbUrl)  
      console.log('Connected to MongoDB successfully')
   } catch (error) {
      console.error('Error connecting to MongoDB:', error)
   }
}
await connect()

app.use(express.json())

app.get('/sales/:date', async (req, res) => {
   try {
      const { date } = req.params;
      const newDate = new Date(date);
      console.log(newDate);
      const sales = await Sales.find({ 
         date: {
            $gte: new Date(date),
            $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
         }
      });
      res.status(200).json(sales); 
   } catch (error) {
      console.error('Error fetching sales:', error);
      res.status(500).json({ message: 'Internal Server Error' });
   }
})

app.post('/sales', async (req, res) => {
   try {
      const { name, price } = req.body;
      if (!name || !price) {
         return res.status(400).json({ message: 'Name and price are required' });
      }
      const newSale = new Sales({ name, price });
      await newSale.save();
      res.status(201).json(newSale);
   } catch (error) {
      console.error('Error creating sale:', error);
      res.status(500).json({ message: 'Internal Server Error' });
   }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
