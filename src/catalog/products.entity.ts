import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Categories } from './categories.entity';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  ref: string;

  @Column('text', { nullable: false })
  description: string;

  @Column({ nullable: false })
  image: string;

  @Column('int', { nullable: false })
  price: number;

  @ManyToOne(() => Categories, (category) => category.products) // Relation ManyToOne vers l'entité Category
  @JoinColumn({ name: 'category_id' }) // Nom de la colonne de clé étrangère
  category: Categories; // Propriété pour accéder à l'entité Category

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
