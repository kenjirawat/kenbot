var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var request = require('request')
var token = 'EAAWBsWbe93ABANWBJtmEcZAfo5b7qhFawTlFyMxc5qKIkIvLvjQQmUsx3i6gwA0htFh7z8cORsTIuvOFxRynbrRKPjAS8vtqlMhS1Vy0nEPUheuONf3rjRhX1vVdQdvc67GHrel74OLvR8JZBDieZAlZBoyC1F3R7ZBZARzDL3vwZDZD'
function sendTextMessage (sender, text) {
  messageData = {
    text: text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: token},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: messageData,
    }
  }, function (error, response, body) {
    if (error) {
      console.log('Error sending message: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}

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
  var messaging_events = req.body.entry[0].messaging
  for (var i = 0; i < messaging_events.length; i++) {
    var event = req.body.entry[0].messaging[i]
    var sender = event.sender.id
    if (event.message && event.message.text) {
      var text = event.message.text
      console.log(text, sender)
      var subtext = text.subst(' ')
      if (subtext[0] === 'sum') {
        var sum = parseInt(subtext[1]) + parseInt(subtext[2])
        sendTextMessage(sender, sum + '')
      }
      else if (subtext[0] === 'max') {
        if (parseInt(subtext[1]) > parseInt(subtext[2])) {
          sendTextMessage(sender, subtext[1])
        } else {
          sendTextMessage(sender, subtext[2])
        }
      } else if (subtext[0] === 'min') {
        if (parseInt(subtext[1]) < parseInt(subtext[2])) {
          sendTextMessage(sender, subtext[1])
        } else {
          sendTextMessage(sender, subtext[2])
        }
      } else if (subtext[0] === 'avg') {
        var avgSum = 0
        for (var b = 1; b < arrText.length; b++) {
          avgSum = avgSum + parseInt(subtext[b])
        }
        var avg = avgSum / (arrText.length - 1)
        sendTextMessage(sender, avg)
      }
    }
  }
  res.sendStatus(200)
})

app.set('port', (process.env.PORT || 5000))
app.listen(app.get('port'), function () {
  console.log('Example app listen on port' + app.get('port' + '!'))
})
