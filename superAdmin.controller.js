import User from '../models/db/user.model';
import jwtDecode from 'jwt-decode';
import validation from '../helpers/validation';
import userModel from '../models/body/user.model';

//import res from 'express/lib/response';
//import UserController from './user.controller';

class SuperAdmin {

    static async getAllUsers (req, res){
    const users = await User.find({});
    res.status(200).json({
        status: 200,
        data: users,
    })
}

static    async changeRoles(req,res) {
  const { role } = req.body;
  const { id } = req.query;
  const { authorization } = req.headers;
  const token = authorization.split('')[1];
  const {error}= validation.changeRoleValidations(userModel.changeRoles(req));
  

  if(error) {
      return res.status(400).json({
          message: error.details[0].message.replace(/"/g,''),
          status: 400

      })
  }
  const decodedToken = jwtDecode(token);

  if(decodedToken.user.roles !== 'super-admin'){
      return res.status(401).json({
          message: 'Oops, you are not allowed to take this action!)-:',
          status: 401
      })
  }

  User.findByIdAndUpdate(id, { roles: role}, (err, result) => {
      res.status(201).json({
          message: 'oooo, you have the role of the user',
          user: result
      });
  });
}

   static async changeStatus(req,res) {
    const { status } = req.body;
    const { id } = req.query;
    const { authorization } = req.headers;
    const token = authorization.split('')[1];
    const decodedToken = jwtDecode(token);
    const {error}= validation.changeStatusValidations(userModel.changeStatus(req));
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message.replace(/"/g,''),
        });
    }
    if(decodedToken.user.roles !=='super-admin'){
        return res.status(401).json({
            message: 'Oops, you are not allowed to take this action!)-:',
            status: 401
        });
    }
    User.findByIdAndUpdate(id, { status: status}, (err, result) => {
        res.status(201).json({
        message: 'oooo, you have changed the status of the user',
        user: result
        });
    });
   }
}
  export default SuperAdmin;