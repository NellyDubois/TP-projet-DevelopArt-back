import 'dotenv/config';
import nodemailer from 'nodemailer';

// import { google } from 'google-auth-library';

// import configurationDatamapper from "../datamapper/configuration.js";
// import { manageResponse } from "../utils/controllerUtils.js";


const contactController = {
    
    async sendEmail(req, res, next) {

        // const oauth2Client = new google.auth.OAuth2(
        //     '706207289318-3pesshg6vf1n5t1k45nuoi7h3k5i5cnk.apps.googleusercontent.com',
        //     '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',
        //     'YOUR_REDIRECT_URI'
        //   );
          
        //   oauth2Client.setCredentials({
        //     refresh_token: 'YOUR_REFRESH_TOKEN'
        //   });
          
        //   const accessToken = await oauth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure:true,    

            auth: {
                // type: 'OAuth2',
                // user: 'odevelopart@gmail.com',
                // clientId: '706207289318-3pesshg6vf1n5t1k45nuoi7h3k5i5cnk.apps.googleusercontent.com',
                // clientSecret: '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',
                // refreshToken: 'YOUR_REFRESH_TOKEN',
                // accessToken: accessToken
              user: 'odevelopart@gmail.com',
              pass: 'yglh jpgt zpry rgoz'
            }
          });

        console.log("req.body",req.body);
        // const { expediteur, sujet, contenu } = req.body;
        const { firstname, lastname, phone, email, story,objectEmail} = req.body;  
        
    
        console.log("process.env.EMAIL",process.env.EMAIL);

        const mailOptions = {
            from: email,
            to: process.env.EMAIL,
            subject: objectEmail,
            text: `${story}\nPrénom: ${firstname}\nNom: ${lastname}\nTéléphone: ${phone}\nEmail: ${email}\n`
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erreur lors de l\'envoi de l\'email :', error);
                res.status(500).send('Erreur lors de l\'envoi de l\'email.');
            } else {
                console.log('Email envoyé avec succès :', info.response);
                res.send('Email envoyé avec succès.');
            }
        });
    },
};    

export default contactController;


//   Côté front
//   fetch('http://localhost:3000/envoyer-email', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     destinataire: 'odevelopart@gmail.com',
//     sujet: 'Sujet de l\'email',
//     contenu: 'Contenu de l\'email'
//   })
// })
// .then(response => {
//   if (!response.ok) {
//     throw new Error('Erreur lors de la requête.');
//   }
//   return response.json();
// })
// .then(data => {
//   console.log(data);
// })
// .catch(error => {
//   console.error('Erreur lors de la requête :', error);
// });