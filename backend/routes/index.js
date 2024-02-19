var express = require('express');
var router = express.Router();
const isAuth=require('../middleware/isauth')
const {createUser,loginUser,updateUser,logoutUser,getUser,deleteUser,getUserid,updateProfile}=require('../controller/usercontroller')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/createUser',createUser)
router.post('/loginUser',loginUser)
router.post('/editUser',isAuth,updateUser)
router.post('/deleteUser',isAuth,deleteUser)
router.post('/logout',isAuth,logoutUser)
router.get('/getUser',isAuth,getUser)
router.get('/getUser/:id',isAuth,getUserid)
router.post('/updateProfile',isAuth,updateProfile)

module.exports = router;
