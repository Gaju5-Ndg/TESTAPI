import express from 'express';
import SuperAdmin from "../controllers/superAdmin.controller";
import UserController from '../controllers/user.controller';
import verifyLogin from "../middleware/Authorization";
const routes = express();

routes.post('/signup', UserController.signup);
routes.post('/signin',UserController.signin);
routes.get('/users', SuperAdmin.getAllUsers)
routes.patch('/role', verifyLogin , SuperAdmin.changeRoles)
routes.patch('/status', verifyLogin , SuperAdmin.changeStatus)



export default routes;