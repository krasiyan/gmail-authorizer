var googleapis = require("googleapis"),
    OAuth2Client = googleapis.auth.OAuth2,
    readline = require("readline"),
    config = require("./config.json"),
    express = require('express'),
    app = express()

if (!config.app_id || !config.app_secret) {
  console.error("Missign app id/secret")
  return
}

var oauth2Client = new OAuth2Client(config.app_id, config.app_secret, "http://localhost:"+config.port || "3000");

var url = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: "https://mail.google.com/"
})

console.log("Please open:", url)

app.get('/', function (req, res) {
  oauth2Client.getToken(req.query.code, function(err, tokens) {
    var tokenInfo = JSON.stringify(tokens, null, 2)
    var response = "<pre>"+tokenInfo+"<pre><br/><a href=\""+url+"\">Again!</a>"
    res.send(response)
  })
})

app.listen(3000)
