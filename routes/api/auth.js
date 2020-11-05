const express = require ('express')
const router = express.Router();
const auth = require ('../../middleware/auth');
const User = require('../../models/User');
const jwt = require ('jsonwebtoken')
const config =require ('config')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator');

//@route GET api/auth
//@desc  Test Route
//@access Public

//protected route by adding "auth" .. and req.user is the user authenticated user
router.get ('/', auth, async(req, res) => 
{ try { 
    const user =await User.findById(req.user.id).select ('-password')
    res.json(user)

  } catch (err ){
      console.error(err.message)
      res.status(500).send ('Server Error')

  }
})


//@route POST api/users
//@desc  Authenticate user and get token
//@access Public

router.post(
    '/', 
    [
    //express validation -> body of the request
   
    check('email', 'Please input valid email').isEmail(),
    check('password', 'Password required').exists()

    ], 
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json ({errors: errors.array()})
        }
       
        //Destructure the req.boby from post request
        const {email, password}  = req.body;

        try {
            // See if the user exist, if exist sent error by filtering email and mobile number
                let user = await User.findOne({email});
                //check also the email
                // const mail = await User.findOne({email})
                
                if (!user) {
                    // if (user || mail)
                   return res.status(400).json({errors: [ {msg: 'Invalid Credentials'}]})
                }      

                //Check is password is a match

                const isMatch = await bcrypt.compare (password, user.password)

                if (!isMatch) {
                    return res
                    .status(400)
                    .json({errors: [{msg: 'Invalid Credential'}]})
                }


                // Return JsonWebtoken
                const payload ={
                    user: {
                        id: user.id
                    }
                }
                
                jwt.sign(
                    payload, 
                    config.get('jwtSecret'), 
                    {expiresIn: 3600000},
                    (err, token) => {
                        if(err) throw err;
                       
                        res.json({token})
                    })

               // res.send('User Added')

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }
        
       
    })

module.exports = router;