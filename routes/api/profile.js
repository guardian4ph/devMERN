const express = require ('express')
const router = express.Router();
const auth = require('../../middleware/auth')
//@route GET api/profile/me
//@desc  Get Current user Profile
//@access Private

router.get ('/', auth, async (req, res) => 
{ 
    try{

    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

}
)


module.exports = router;