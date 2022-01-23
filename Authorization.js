import jwt from 'jsonwebtoken';

const verifyLogin = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(''[1]);
        const verify =jwt.verify(token, 'testAPI');

        if (verify){
            req.user = verify;
            next();
        } else {
            res.status(403).json({
                status: 403,
                message: 'Failed to Authenticate'
            });
        }
    }catch(err) {
        res.status(403).json({
            status: 403,
            message: 'Failed to Authenticate'
        });
    }
}
export default verifyLogin;