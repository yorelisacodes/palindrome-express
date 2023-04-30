const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')



MongoClient.connect('mongodb+srv://yorelisac:testing123@cluster0.y2pmowb.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true, })

  .then(client => {
    console.log('connected to DataBase')
    db = client.db('palindrome')
    db.collection('userInput')

  })
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
console.log('public')
app.use(bodyParser.json())


app.listen(8888, function () {
  console.log('hello world!')
})
app.get('/', (req, res) => {
  db.collection('userInput').find().toArray()
    .then(result => {
      res.render('index.ejs', { userInputs: result })

    })

    .catch(error => console.error(error))


})

app.post('/userInput', (req, res) => {
  let userInput = req.body.userInput
  console.log(req.body)
  let palindrome = userInput === req.body.userInput.toLowerCase().split('').reverse().join('')

  const objToJson = {
    success: palindrome,
    result: palindrome ? 'Your Name is a palindrome' : 'No! your name is not a palindrome'
  }


  db.collection('userInput').insertOne({ userInput: req.body.userInput })
    .then(result => {
      res.end(JSON.stringify(objToJson))
      console.log(result)
    })
})
app.put('/userIput', (req, res) => {
  db.collection('userInput').findOneAndUpdate({userInput: req.body.userInput },
    {


      $set: {
        userInput: req.body.userInput

      },
    },
    options
  )
    .then(result => {
      console.log(result)
    })
    .catch(error => console.error(error))
})




app.delete('/userInput', (req, res) => {
  console.log(req.body)
  db.collection('userInput').findOneAndDelete({ userInput: req.body.userInput })
    .then(result => {
      if (result.deletedCount === 0) {
        return res.json('Please add a name')
      }
      res.json('See ya later!!')
    })
    .catch(error => console.error(error))
})

