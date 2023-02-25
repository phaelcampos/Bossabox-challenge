import { ArrayContains, In } from "typeorm";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../helpers/apiErrors";
import toolsInterface from "../interfaces/toolsInterface"
import userInterface from "../interfaces/userInterface"
import { toolRepository } from "../repositories/toolRepository";

export default class ToolsBusiness {
  async insertTool(decodedToken: userInterface, tool: toolsInterface){

    const toolNameResult = await toolRepository.findOneBy({
      name: tool.name,
    })
    if (toolNameResult) throw new BadRequestError("Ferramenta já cadastrada");
    const toolToSave = toolRepository.create({
      name: tool.name,
      description: tool.description,
      user: decodedToken,
      link: tool.link,
      tags: tool.tags,
    })
    await toolRepository.save(toolToSave);

    return {
      statusCode: 201,
      message: "ferramenta criada com sucesso",
  }
  }

  async getAllTools(){
    const toolsResult = await toolRepository.find({
      select:{
        id: true,
        name: true,
        description: true,
        tags: true,
        link: true,
      }
    });
    if (!toolsResult) throw new NotFoundError("Não há ferramentas cadastradas")
    return toolsResult
  }

  async getMultipleToolsByID(tags: Array<string> | string){
    const toolsResult = await toolRepository.find({
      where: {
        tags: ArrayContains([tags]),
    },
      select:{
        id: true,
        name: true,
        description: true,
        tags: true,
        link: true,
      }
    });
    if (!toolsResult) throw new NotFoundError("Ferramenta não encontrada")
    return toolsResult
  }

  async deleteTool(id: number, decodedToken: userInterface){
    const toolResult = await toolRepository.findOne({
      relations:{
        user: true
      },
      where:{
        id: id
      }
    });
    
    if (!toolResult) throw new NotFoundError("Ferramenta não encontrada");
    if (toolResult.user.id !== decodedToken.id) throw new UnauthorizedError("Ferramenta não pertence a esse usuário");

    const toolsResult = await toolRepository.delete({id: id});
    if (!toolsResult) throw new NotFoundError("Ferramenta não encontrada");

    return "toolsResult"
  }
}