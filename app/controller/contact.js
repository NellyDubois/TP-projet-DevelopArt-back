import 'dotenv/config';
import nodemailer from 'nodemailer';

// import { google } from 'google-auth-library';

// import configurationDatamapper from "../datamapper/configuration.js";
// import { manageResponse } from "../utils/controllerUtils.js";


const contactController = {
    
    async sendEmail(req, res, next) {

        const transporter = nodemailer.createTransport({
            service: `${process.env.NODEMAILER_SERVICE}`,
            host: `${process.env.NODEMAILER_HOST}`,
            port: `${process.env.NODEMAILER_PORT}`,
            secure:true,    

            auth: {
              user: `${process.env.NODEMAILER_USER}`,
              pass: `${process.env.NODEMAILER_PASS}`
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

