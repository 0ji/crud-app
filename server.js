// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
console.log('May Node be with you');

app.set('view engine', 'ejs')


// middlewares and other routes here.
app.use(express.static('public'))
app.use(bodyParser.json())

// body-parser package
app.use(bodyParser.urlencoded({ extended: true }))


var connectionString = 'mongodb+srv://koji:i3ff9A7zEQey9pJc@crud-test.uqlj0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('employee-info')
        const infoColl = db.collection('info')

        app.listen(3000, function () {
            console.log('Listening on port 3000')
        })

        app.get('/', function (req, res) {
            db.collection('info').find().toArray()
                .then(results => {
                    res.render('index.ejs', { infoColl: results })
                })
                .catch(error => console.error(error))
        })

        app.post('/info', (req, res) => {
            infoColl.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.put('/info', (req, res) => {
            infoColl.findOneAndUpdate(
                { name: 'yoda' },
                {
                    $set: {
                        name: req.body.name,
                        info: req.body.info
                    }
                },
                {
                    upsert: true
                }
            )
                .then(result => {
                    res.json('Success')
                })
                .catch(error => console.error(error))
            
        })

        app.delete('/info', (req, res) => {
            infoColl.deleteOne(
              { name: req.body.name }
            )
              .then(result => {
                  if (result.deletedCount === 0) {
                      return res.json('No quote to delete')
                  }
                res.json(`Deleted Darth Vadar's quote`)
              })
              .catch(error => console.error(error))
          })
    })
    .catch(error => console.error(error))

