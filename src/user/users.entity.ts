import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column('text', { nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @ManyToOne(() => Roles, (roles) => roles.users) // Relation ManyToOne vers l'entité Category
  @JoinColumn({ name: 'role_id' }) // Nom de la colonne de clé étrangère
  roles: Roles; // Propriété pour accéder à l'entité Category

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Users, (users) => users.roles) // Relation OneToMany vers l'entité Users
  users: Users[]; // Propriété pour accéder aux produits liés à cette catégorie

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
