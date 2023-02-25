import { Router } from 'express';
import { createValidator } from 'express-joi-validation'
import UserBusiness from '../controller/userController';
import ToolsBusiness from '../controller/toolsController';
import toolSchema from '../schema/toolSchema';
import { tokenValidator } from '../ultils/tokenValidator';
const validator = createValidator();
const toolsRouter = Router();


toolsRouter.post('/',validator.body(toolSchema), async (req, res) => {
  const validToken =  await tokenValidator(req.headers.authorization as string);

  const toolsBusiness = new ToolsBusiness();
  const response  = await toolsBusiness.insertTool(validToken, req.body)
  
  res.statusCode = response.statusCode;
  res.json(response.message)
  res.send()
});

toolsRouter.get('/', async (req, res) => {
  await tokenValidator(req.headers.authorization as string);
  const toolsBusiness = new ToolsBusiness();
  let response;

  if (req.query.tag){
      if (Array.isArray(req.query.tag)){
        console.log("teste",req.query.tag)
        response = await toolsBusiness.getMultipleToolsByID(req.query.tag as Array<string>);
      }
      else{
        response = await toolsBusiness.getMultipleToolsByID(req.query.tag as string);
      }
  }else{
    response = await toolsBusiness.getAllTools()
  }
  res.statusCode = 200;
  res.json(response)
  res.send()
});


toolsRouter.delete('/:id', async (req, res) => {
  const validToken = await tokenValidator(req.headers.authorization as string);
  const { id } = req.params;

  const toolsBusiness = new ToolsBusiness();
  await toolsBusiness.deleteTool(parseInt(id), validToken);
  res.statusCode = 200;
  res.json("response")
  res.send()
});

export default toolsRouter;