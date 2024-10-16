import express from 'express';
import { adminLogin, adminLogout, adminProfile, adminSignup, checkAdmin } from '../controllers/adminController.js';
const router = express.Router();

router.post('/sign-up',adminSignup)
router.post('/log-in',adminLogin)
router.get('/profile',adminProfile)
router.post('/logout',adminLogout)
router.get('/check-admin',checkAdmin)

router.delete('/delete-account',(req,res,next)=>{

})

router.put('/profile-update',(req,res,next)=>{

})

// export default router;
export {router as adminRouter};