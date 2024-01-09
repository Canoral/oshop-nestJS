import { Controller, Get } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  getAllProducts(): string {
    return this.catalogService.getAllProducts();
  }
  getAllCategories(): string {
    return this.catalogService.getAllCategories();
  }
}
