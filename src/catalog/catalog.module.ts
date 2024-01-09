import { Module } from '@nestjs/common';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './categories.entity';
import { Products } from './products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories, Products])],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class CatalogModule {}
