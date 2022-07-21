const mongoose = require('mongoose')

try {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    console.log('connect successfully')
} catch (err) {
    console.log('connect failure')
}