import { Router } from 'express';
import userSchema from '../schema/userSchema'
import { createValidator } from 'express-joi-validation'
import UserBusiness from '../controller/userController';
import loginSchema from '../schema/loginSchema';

const validator = createValidator();
const userRouter = Router();


userRouter.post('/create',validator.body(userSchema), async (req, res) => { 
  const userBusiness = new UserBusiness();
  const response = await userBusiness.createUser(req.body);
  res.statusCode = response.statusCode;
  res.json(response.message)
  res.send()
  });

 userRouter.post('/login',validator.body(loginSchema), async (req, res) => { 
  const userBusiness = new UserBusiness();
  const response = await userBusiness.login(req.body);
  res.statusCode = response.statusCode;
  res.json({
    message: response.token
  })
  res.send()
  });

export default userRouter;