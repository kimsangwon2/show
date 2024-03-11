import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../types/showRole.type';
import { Point } from 'src/point/entities/point.entity';
@Entity({
  name: 'shows',
})
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  info: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  datetime: string[];

  @Column({ type: 'varchar', select: false, nullable: false })
  place: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  seatinfo: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  image: string;

  @Column({ type: 'enum', enum: Category, default: Category.musical })
  category: Category;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @OneToMany(() => Point, (point) => point.user)
  point: Point[];
}
