const express = require('express');
const mongoose = require('mongoose')
const env = require('dotenv');

const userRouts = require('./routes/user')
const adminRouts = require('./routes/admin/user')
const cetagoryRouts = require('./routes/cetagory')
const productRouts = require('./routes/product')
const cartRouts = require('./routes/cart')


const bodyParser = require('body-parser')
const app = express();
env.config();

mongoose.connect(`mongodb+srv://${process.env.M_DB_User}:${process.env.M_DB_Password}@cluster0.oi8bs.mongodb.net/${process.env.M_DB_Database}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected Succesfully')
})

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/api', userRouts)
app.use('/api', adminRouts)
app.use('/api', cetagoryRouts)
app.use('/api', productRouts)
app.use('/api', cartRouts)




app.listen(process.env.PORT, () => {
    console.log(`The server is running on port ${process.env.PORT}`);
})