import { Router } from 'express';
import { createValidator } from 'express-joi-validation'
import UserBusiness from '../controller/userController';
import ToolsBusiness from '../controller/toolsController';
import toolSchema from '../schema/toolSchema';
const validator = createValidator();
const toolsRouter = Router();


toolsRouter.post('/',validator.body(toolSchema), async (req, res) => {

  const token = req.headers.authorization ?? '';
  const userBusiness = new UserBusiness();
  const validToken = await userBusiness.authenticate(token);
  
  const toolsBusiness = new ToolsBusiness();
  const response  = await toolsBusiness.insertTool(validToken, req.body)
  
  res.statusCode = response.statusCode;
  res.json(response.message)
  res.send()
  });

export default toolsRouter;