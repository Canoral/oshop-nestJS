import { Controller, Get, Param } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { Products } from './products.entity';
import { Categories } from './categories.entity';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('products')
  getAllProducts(): Promise<Products[]> {
    return this.catalogService.getAllProducts();
  }

  @Get('categories')
  getAllCategories(): Promise<Categories[]> {
    return this.catalogService.getAllCategories();
  }

  @Get('category/:id')
  getOneCategory(@Param('id') id: number) {
    return this.catalogService.getOneCategory(id);
  }

  @Get('product/:id')
  getOneProduct(@Param('id') id: number): Promise<Products> {
    return this.catalogService.getOneProduct(id);
  }
}
