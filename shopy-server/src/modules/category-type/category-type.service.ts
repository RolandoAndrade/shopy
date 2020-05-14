import { Injectable } from '@nestjs/common';
import { ILogger } from '../../logger/ILogger';
import { logger } from '../../logger/loggerConst';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryType } from './category-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryTypeService {

    private logger: ILogger;

    constructor(
        @InjectRepository(CategoryType)
        private readonly CategoryTypeRepository: Repository<CategoryType>
    ) {
        this.logger = logger;
    }

    /**
     * getCategoryTypes
     * @returns Promise<CategoryType[]>
    */
    async getCategoryTypes(): Promise<CategoryType[]>{
        this.logger.log('getCategoryTypes: Obteniendo todos los tipos de categorias', 
            'CategoryTypeService');

        return await this.CategoryTypeRepository
            .createQueryBuilder('CategoryType')
            .innerJoinAndSelect('CategoryType.categories', 'categories')
            .getMany();
    }

}
