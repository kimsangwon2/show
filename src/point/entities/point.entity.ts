import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'points',
})
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  //   @ManyToOne(() => Show, (show) => show.point)
  //   show: Show[];

  @Column({ type: 'int', nullable: false })
  point: number;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.point)
  user: User;
  // @Column({ type: 'datetime' })
  // updatedAt: Date;
}
