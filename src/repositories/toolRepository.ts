import { AppDataSource } from "../data-source";
import { Tools } from "../entities/Tools";

export const toolRepository = AppDataSource.getRepository(Tools)