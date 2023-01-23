const asyncHandler = require('express-async-handler')

const verifRobot = asyncHandler(async (req, res) => {
    //Destructuring response token from request body
        const {token} = req.body;
    //sends secret key and response token to google
        await axios.post(
          `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
          );
    
          if (res.status(200)) {
            res.send("Human");
        }else{
          res.send("Robot");
        }
    });

    module.exports = verifRobot

   
  
  