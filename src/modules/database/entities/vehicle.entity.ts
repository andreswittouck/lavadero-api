import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('vehicles')
export class VehicleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @ManyToOne(() => UserEntity, (user) => user.vehicles, { onDelete: 'CASCADE' })
  owner: UserEntity;
}
