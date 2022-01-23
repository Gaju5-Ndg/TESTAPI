import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


class Authenticate {

    static generateToken (user) {
        return jwt.sign({user}, 'testAPI', { expiresIn: '30d'})
    }
    static hashPassword (password) {
        return bcrypt.hashSync(password, 10);
    };

  static comparePassword(password ,hashedPassword) {
      return bcrypt.compareSync(password, hashedPassword);
  }
}
 export default Authenticate;
   
