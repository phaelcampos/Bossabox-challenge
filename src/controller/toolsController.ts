import { BadRequestError } from "../helpers/apiErrors";
import toolsInterface from "../interfaces/toolsInterface"
import userInterface from "../interfaces/userInterface"
import { toolRepository } from "../repositories/toolRepository";

export default class ToolsBusiness {
  async insertTool(decodedToken: userInterface, tool: toolsInterface){

    const toolNameResult = await toolRepository.findOneBy({
      name: tool.name,
    })
    if (toolNameResult) throw new BadRequestError("Ferramenta já cadastrada");
    const date = new Date();
    const toolToSave = toolRepository.create({
      name: tool.name,
      description: tool.description,
      user: decodedToken,
      link: tool.link,
      tags: tool.tags,
      createdAt: date.toISOString(),
    })
    await toolRepository.save(toolToSave);

    return {
      statusCode: 201,
      message: "ferramenta criada com sucesso",
  }
  }
}