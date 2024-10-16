import e from "express";
import { createMenu, deleteMenu, getMenu, getMenuItems, updateMenu } from "../controllers/menuItemController.js";
import { authResto } from "../middlewares/authRest.js";

const router = e.Router();
router.post("/create",authResto,createMenu)
router.get("/getmenuitems",authResto,getMenuItems)
router.get("/getmenu/:id",authResto, getMenu)
router.put("/updatemenu/:id",authResto, updateMenu)
router.delete("/deletemenu/:id",authResto,deleteMenu)

export {router as MenuRouter};