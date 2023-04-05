var express = require('express');
var router = express.Router();

/* GET home page. */
router.use(function(req, res, next) {
  console.log("Check auth")
  const auth = true
  if(auth){
    next()
  }else{
    res.status(401).send("Authentication failed.")
  }
});

module.exports = router;
