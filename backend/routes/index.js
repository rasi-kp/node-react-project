var express = require('express');
var router = express.Router();
const {createUser,loginUser,updateUser,logoutUser,getUser,getUserid,updateProfile}=require('../controller/usercontroller')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/createUser',createUser)
router.post('/loginUser',loginUser)
router.post('/updateUser',updateUser)
router.post('/logout',logoutUser)
router.get('/getUser',getUser)
router.get('/getUser/:id',getUserid)
router.post('/updateProfile',updateProfile)

module.exports = router;
