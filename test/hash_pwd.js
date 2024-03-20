import bcrypt from 'bcrypt';


async function encodePassword(password){
    const hash= await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));
    
};

// encodePassword('Nelly21@');

// encodePassword('Passw0rd*');

encodePassword('Aurelie0!');