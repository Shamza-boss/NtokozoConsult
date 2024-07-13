var express = require("express");
//used for controlling emails
var nodemailer = require('nodemailer');

//middleware function
const MailRouter = express.Router();

MailRouter.post("/", (request, response) => {
    
    var transporter = nodemailer.createTransport({
        host: 'pld109.truehost.cloud',
        port: 465,
        auth: {
          user: 'website@ntokozoconsult.com',
          pass: '1UY_OM?e!C^ENT'
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      });
      const source = request.body.MailAddress;
      const to = 'info@ntokozoconsult.com';
      const subject = `${request.body.MailFullname}`;
      const message = `Has traded before: ${request.body.MailTrade}.\nPhone: ${request.body.MailPhone}\nAmount Planned to spend: R${request.body.MailAmount}.\nMessage: ${request.body.Mailbody}`;
      console.log(`${source}, ${subject}, \n${message}`);
      //email composition
      var mailOptions = {
        from: source,
        to: to,
        subject:' Website Query: '+subject,
        text: message
      };
      if(subject==""||source==""||message==""){
        response.redirect('/Mail/FailedEmail')
      }else{
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            //if email fails to send successfully then render the failure page
            console.log(error);
            response.redirect('/Mail/FailedEmail')
          } else {
            //if email sends successfully then render the success page
            console.log('Email sent: ' + info.response);
            response.redirect('/Mail/SentEmail')
          }
        });
        
      }
      
  })

  MailRouter.get('/FailedEmail', (req, res)=>{
    res.status(500).render("failure.ejs")
  });
  MailRouter.get('/SentEmail', (req, res)=>{
    res.status(500).render("success.ejs")
  })

  module.exports = MailRouter;