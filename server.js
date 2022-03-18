// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// newEmp.save(function (error, document) {
//     if (error) console.error(error)
//     console.log(document)
// })

const mongoose = require('mongoose')

var connectionString = 'mongodb+srv://koji:i3ff9A7zEQey9pJc@crud-test.uqlj0.mongodb.net/info?retryWrites=true&w=majority';
mongoose.connect(connectionString, { useNewUrlParser: true })

const db = mongoose.connection
db.once('open', _ => {
    console.log('Database conencted:', connectionString)
})

db.on('error', err => {
    console.error('connection error:', err)
})

// const Employee = require('./models/Employee')

// const newEmp = new Employee ({
//     firstName: 'first',
//     lastName: 'last',
//     position: 'Employee',
//     address: '123 Wallaby',
//     phone: '123-456-789',
//     isAdmin: true,
// })

app.set('view engine', 'ejs')

// middlewares and other routes here.
app.use(express.static('public'))
app.use(bodyParser.json())

// body-parser package
app.use(bodyParser.urlencoded({ extended: true }))


app.listen(3000, function () {
    console.log('Listening on port 3000')
})

app.get('/', function (req, res) {
    res.render('manager.ejs', {})
})

// MongoClient.connect(connectionString, { useUnifiedTopology: true })
//     .then(client => {
//         console.log('Connected to Database')
//         const db = client.db('employee-info')
//         const infoColl = db.collection('info')

//         app.post('/info', (req, res) => {
//             infoColl.insertOne(req.body)
//                 .then(result => {
//                     res.redirect('/')
//                 })
//                 .catch(error => console.error(error))
//         })

//         app.put('/info', (req, res) => {
//             infoColl.findOneAndUpdate(
//                 { name: 'yoda' },
//                 {
//                     $set: {
//                         name: req.body.name,
//                         info: req.body.info
//                     }
//                 },
//                 {
//                     upsert: true
//                 }
//             )
//                 .then(result => {
//                     res.json('Success')
//                 })
//                 .catch(error => console.error(error))
            
//         })

//         app.delete('/info', (req, res) => {
//             infoColl.deleteOne(
//               { name: req.body.name }
//             )
//               .then(result => {
//                   if (result.deletedCount === 0) {
//                       return res.json('No quote to delete')
//                   }
//                 res.json(`Deleted Darth Vadar's quote`)
//               })
//               .catch(error => console.error(error))
//           })
//     })
//     .catch(error => console.error(error))

