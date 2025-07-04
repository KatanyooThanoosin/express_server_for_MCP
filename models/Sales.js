import mongoose from 'mongoose';

const salesSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   date: {
      type: Date,
      default: Date.now
   }
});

const Sales = mongoose.model('Sales', salesSchema);
export default Sales;