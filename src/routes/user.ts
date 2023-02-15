import { Router } from 'express';
import userSchema from '../schema/userSchema'
import { createValidator } from 'express-joi-validation'
import UserBusiness from '../business/userBusiness';

const validator = createValidator();
const userRouter = Router();


userRouter.post('/user',validator.body(userSchema), async (req, res) => { 
    const userBusiness = new UserBusiness();
    const response = userBusiness.createUser(req.body);
    res.statusCode = 200;
    res.json(response)
    res.send()
  });

export default userRouter;