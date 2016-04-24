var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var token = "CAAWBsWbe93ABAJHtoZCIPGhG5mFmV2ocmZB5BaZBOjYbsqQIK48eMUtuBy6tBxizpw0vnEGxByG9Rc80jCke10gb5L70SYNdJbJmUZBZCl6Re33LSypKLjZCZBC8dmFDa88pAR4cXMjtkCZCJoW6NNcMxMJMJjFKeODLf30UHK3Fzmri8vZCobskPghJvah54A54ZD";
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hell word')
})
app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === '1234') {
    res.send(req.query['hub.challenge'])
  } else {
    res.send('Error, wrong validation token')
  }
})
app.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging
  for (var i = 0; i < messaging_events.length; i++) {
    var event = req.body.entry[0].messaging[i]
    var sender = event.sender.id
    if (event.message && event.message.text) {
      var text = event.message.text
    // Handle a text message from this sender
    }
  }
  res.sendStatus(200)
})

app.set('port', (process.env.PORT || 5000))
app.listen(app.get('port'), function () {
  console.log('Example app listen on port' + app.get('port' + '!'))
})
