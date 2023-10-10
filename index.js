var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express();
const port = 3001
app.use(bodyParser.json())
app.use(cors());

const MAIL_USERNAME='markusmikely@gmail.com',
MAIL_PASSWORD='Coding1984!',
OAUTH_CLIENTID='471855448716-t7b1p68i1pobraqravdi470ftfr27ns2.apps.googleusercontent.com',
OAUTH_CLIENT_SECRET='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',
OAUTH_REFRESH_TOKEN='1//04l6TUd-8cJfPCgYIARAAGAQSNwF-L9Irs2GXZYH31jy25-CoGwZLTvILqBOowB8yXjaJ8TLoS0r39zWmhrmTuB9EhYSvRDPAJVY'

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: MAIL_USERNAME,
      pass: MAIL_PASSWORD,
      clientId: OAUTH_CLIENTID,
      clientSecret: OAUTH_CLIENT_SECRET,
      refreshToken: OAUTH_REFRESH_TOKEN
    }
});

const validateField = (field, message) => {
    if(!field) {
        res.send(400).json({message: message})
    }
}
const sendEmail = (req, res) => {
    if(req.body) {
        validateField(req.body.name, "Name Required");
        validateField(req.body.email, "Email Required");
        validateField(req.body.number, "Number Required");
        validateField(req.body.message, "Message Required");
    }
    let mailOptions = {
        from: 'markusmikely@gmail.com',
        to: 'markusmikely@gmail.com',
        subject: 'App Crafters - Contact Message',
        text: JSON.stringify(req.body)
    };
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
          res.send(400).json({message: 'Bad request', error: err})
        } else {
            console.log("Email sent successfully");
            res.send(200).json({message: 'Email sent successfully'})
        }
    });
}

app.post('/send-email', (req, res) => {
    sendEmail(req, res)
})
app.listen(port, () => {
    console.log(`App Crafters api is listening at http://localhost:${port}`)
})