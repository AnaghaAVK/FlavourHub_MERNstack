import express from 'express';
import { create } from '../controllers/userController.js';
import { login } from '../controllers/userController.js';
const router = express.Router();

// router.post('/sign-up',(req,res,next)=>{
//     console.log("welcome to sign in");
    
// })


//  end points of user

router.post('/sign-up',create);

router.post('/log-in',login)
router.put('/profile-update',(req,res,next)=>{

})
router.get('/profile',(req,res,next)=>{

})
router.post('/logout',(req,res,next)=>{

})
router.delete('/delete-account',(req,res,next)=>{

})
router.get('/check-user',(req,res,next)=>{

})

// export default router;
export {router as userRouter};