import express from "express";
import { userRouter } from "./userRoute.js";
import { adminRouter } from "./adminRoute.js";
import { restaurantRouter } from "./restaurantRoute.js";
import { MenuRouter } from "./menuRoute.js";
import { cartRouter } from "./cartRoute.js";
import { orderRouter } from "./orderRoute.js";

const router = express.Router();

router.use('/user',userRouter);
router.use('/admin',adminRouter);
router.use("/restaurant",restaurantRouter);
router.use("/menu",MenuRouter);
router.use("/order",orderRouter);
router.use("/cart",cartRouter);



export {router as apiRouter};
