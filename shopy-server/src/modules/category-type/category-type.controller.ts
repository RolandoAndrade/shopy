import { Controller, Get, ParseIntPipe, Param, Query } from '@nestjs/common';
import { CategoryTypeService } from './category-type.service';
import { ILogger } from '../../logger/ILogger';
import { logger } from '../../logger/loggerConst';
import { CategoryType } from './category-type.entity';

@Controller('category-type')
export class CategoryTypeController {
    private logger: ILogger;

    constructor(private readonly categoryTypeService: CategoryTypeService) {
        this.logger = logger;
    }

    @Get()
    getCategoryTypes(): Promise<CategoryType[]> {
        this.logger.log('getCategoryTypes: Obteniendo todos los tipos de categorias', 
            'CategoryTypeController');

        return this.categoryTypeService.getCategoryTypes();
    }
}
