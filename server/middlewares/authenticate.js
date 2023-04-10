const express = require('express');
const router = express.Router();
const httpCode = require('../utils/httpCode')


/* GET home page. */
router.use(function(req, res, next) {
  const auth = true
  if(auth){
    next()
  }else{
    res.status(httpCode.UNAUTHORIZED).send("Authentication failed.")
  }
});

module.exports = router;
