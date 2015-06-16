var googleapis = require('googleapis'),
    OAuth2Client = googleapis.auth.OAuth2,
    readline = require('readline')

var APP_ID = ""
var APP_SECRET = ""

if (!APP_ID || !APP_SECRET) {
  console.error("Missign app id/secret")
  return
}

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

var oauth2Client = new OAuth2Client(APP_ID, APP_SECRET, "http://localhost:3000");

var url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://mail.google.com/'
})

console.log('Please open:', url)
rl.question('Enter the code here:', function(code) {
  // request access token
  oauth2Client.getToken(code, function(err, tokens) {
    // set tokens to the client
    console.info(JSON.stringify(tokens))
  })
})
