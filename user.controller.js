 import User from '../models/body/user.model';
 import validation from '../helpers/validation';    
 import Authenticate from '../helpers/authenticate';   
 import UserModel from '../models/db/user.model';     
 import Mongoose  from 'mongoose';
             
class UserController {
    static signup(req, res) {
         const {names,email, password} = req.body;
         const loEmail = email.toLowerCase();
         const { error } = validation.registerValidations(User.createUser(req));

         if (error) {
             return res.status(400).json({
                 status: 400,
                 message: error.details[0].message.replace(/"/g,'')
             });
         }
        UserModel.find({email: loEmail}, (error, result) => {
            if(result.length) {
                return res.status(409).json({
                    status:409,
                    message:"Email already exists, try another one"
                })
            }
            const hashedPassword = Authenticate.hashPassword(password);
            
            const user = new UserModel({
                _id: new Mongoose.Types.ObjectId(),
                names: names,
                email: loEmail,
                password: hashedPassword
            });

            user
                .save()
                .then(() => {
                    res.status(201).json({
                        message: "heyy , you have created an account",
                        status: 201,
                    });
                }).catch(err => {
                    res.status(500).json({
                        message: "check your internnet",
                        status: 500
                    });
                })
        })

    }
    static signin (req,res) {
        const {email, password} = req.body;
        const loEmail = email.toLowerCase();

        UserModel.find({email:loEmail}, (error, result) => {

            if(result.length){
            const compared = Authenticate.comparePassword(password, result[0].password)

            if(compared) {
                res.status(200).json({
                    message: "you are logged in successfully",
                    status: 200,
                    token: Authenticate.generateToken(result[0])
                });
            } else {
                    res.status(400).json({
                        message: "incorrect input or password",
                        status: 400,
                    });
            }
            }else {
                res.status(403).json({
                    message: "incorrect input or password",
                    status: 400,
                });
            }
        });
    }

}

export default UserController;