import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Products } from './products.entity'; // Assurez-vous d'importer votre entité Products

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @OneToMany(() => Products, (product) => product.category) // Relation OneToMany vers l'entité Products
  products: Products[]; // Propriété pour accéder aux produits liés à cette catégorie
}
