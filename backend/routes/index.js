var express = require('express');
var router = express.Router();
const isAuth=require('../middleware/isauth')
const {createUser,loginUser,message,message_get,updateUser,getUser,deleteUser,home,getUserid,updateProfile}=require('../controller/usercontroller')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/createUser',createUser)
router.post('/loginUser',loginUser)
router.post('/editUser',isAuth,updateUser)
router.get('/home',isAuth,home)
router.post('/deleteUser',isAuth,deleteUser)
router.get('/getUser',isAuth,getUser)
router.get('/getUser/:id',isAuth,getUserid)
router.post('/updateProfile',isAuth,updateProfile)
router.post('/message',isAuth,message)
router.get('/message',isAuth,message_get)

module.exports = router;
