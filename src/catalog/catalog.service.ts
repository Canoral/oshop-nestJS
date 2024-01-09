import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './categories.entity';
import { Repository } from 'typeorm';
import { Products } from './products.entity';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
  ) {}

  async getAllProducts(): Promise<Products[]> {
    const result = await this.productRepository.find();
    if (!result) {
      throw new NotFoundException('Une erreur est survenu');
    }
    return result;
  }

  async getAllCategories(): Promise<Categories[]> {
    const result = await this.categoryRepository.find();
    if (!result) {
      throw new NotFoundException('Une erreur est survenue');
    }
    return result;
  }

  async getOneCategory(id: number) {
    const result = await this.categoryRepository.findOne({
      where: { id: id },
      relations: ['products'],
    });
    if (!result) {
      throw new NotFoundException("Catégorie n'éxiste pas");
    }
    return result;
  }

  async getOneProduct(id: number): Promise<Products> {
    const result = await this.productRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!result) {
      throw new NotFoundException("Le produit n'éxiste pas");
    }
    return result;
  }
}
