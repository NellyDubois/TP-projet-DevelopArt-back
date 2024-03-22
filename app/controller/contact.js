// Import de dotenv pour les variables d'environnement
import 'dotenv/config';
// Import de nodemailer pour l'envoi d'email
import nodemailer from 'nodemailer';

// Création du controller pour le formulaire de contact
const contactController = {     
    /**
     * Méthode pour l'envoi d'un email'.
     * @async
     * @param {object} req - requête.
     * @param {object} res - réponse.
     * @param {Function} next - prochain middleware.
     * @returns {object} - Renvoie un message de confirmation de l'envoi de l'email.
     */
    async sendEmail(req, res, next) {
        // Configuration du transporteur avec les informations de service de messagerie (service), hôte (host), port (port), authentification (auth) 
        const transporter = nodemailer.createTransport({
            service: process.env.NODEMAILER_SERVICE,
            host: process.env.NODEMAILER_HOST,
            port: process.env.NODEMAILER_PORT,
            secure:true,    
            auth: {
              user: process.env.NODEMAILER_USER,
              pass: process.env.NODEMAILER_PASS
            }
        });

         //Récupération des données du formulaire de contact 
        const { firstname, lastname, phone, email, story,objectEmail} = req.body;  
        
        //Définition des options de l'email: expéditeur, destinataire, objet, texte
        const mailOptions = {
            from: email,
            to: process.env.EMAIL,
            subject: objectEmail,
            text: `${story}\nPrénom: ${firstname}\nNom: ${lastname}\nTéléphone: ${phone}\nEmail: ${email}\n`
        };
    
        //Appel de la méthode sendMail du transporteur pour envoyer l'email
        // Si une erreur se produit, une réponse d'erreur est renvoyée avec un code d'état HTTP 500. Sinon, une réponse de succès est renvoyée avec un message indiquant que l'e-mail a été envoyé avec succès.
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).send('Erreur lors de l\'envoi de l\'email.');
            } else {
                res.send('Email envoyé avec succès.');
            }
        });
    },
};    
//Export pour être utilisé dans d'autres parties de l'application
export default contactController;

