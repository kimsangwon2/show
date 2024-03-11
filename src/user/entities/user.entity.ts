import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from '../types/userRole.type';
import { Point } from 'src/point/entities/point.entity';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'boolean', default: false })
  is_admin: boolean;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @OneToMany(() => Point, (point) => point.user)
  point: Point[];

  // @Column({ type: 'datetime' })
  // updatedAt: Date;
}
