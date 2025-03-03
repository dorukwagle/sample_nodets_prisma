import { Prisma } from "@prisma/client"
import prismaClient from "./prismaClient"
import PaginationReturnTypes from "../entities/PaginationReturnTypes"
import PaginationParams, { PaginationParamsType } from "../validations/PaginationParams";
import { DEFAULT_PAGE_SIZE } from "../entities/constants";


  const paginateItems = async <T>(model: Uncapitalize<Prisma.ModelName>, args: T, params?: PaginationParamsType) => {
    const validation = PaginationParams.pick({ page: true, pageSize: true }).safeParse(params).data;
    const page = validation?.page || 1;
    const pageSize = validation?.pageSize || DEFAULT_PAGE_SIZE;
    // @ts-ignore
     const count = await prismaClient[model].count({ where: args.where });
     
    // @ts-ignore
    const data = await prismaClient[model].findMany({
      ...args,
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return {
      data,
      statusCode: 200,
      info: {
        total: count,
        lastPage: Math.ceil(count / pageSize),
        prev: page > 1 ? page - 1 : null,
        next: page < Math.ceil(count / pageSize) ? page + 1 : null,
      },
    } as PaginationReturnTypes;
  };

  export default paginateItems;