import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Show } from './entities/show.entity';
import { CreateShowDto } from './dto/create-show.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
    private readonly userService: UserService,
  ) {}

  async create(createShowDto: CreateShowDto) {
    const { name, info, datetime, place, seatinfo, image, category } =
      createShowDto;

    const newShow = this.showRepository.create({
      name,
      info,
      datetime,
      place,
      seatinfo,
      image,
      category: category[category],
      createdAt: new Date(),
    });

    return await this.showRepository.save(newShow);
  }

  findAll(): Promise<Show[]> {
    return this.showRepository.find();
  }
  findByName(name: string): Promise<Show[]> {
    return this.showRepository.find({
      where: {
        name: ILike(`%${name}%`),
      },
    });
  }

  searchByName(name: string): Promise<Show[]> {
    return this.showRepository.find({
      where: {
        name: ILike(`%${name}%`),
      },
    });
  }

  async findOne(id: number): Promise<Show> {
    const show = await this.showRepository.findOne({
      where: { id },
    });
    if (!show) {
      throw new NotFoundException('해당하는 공연을 찾을 수 없습니다.');
    }
    return show;
  }
  async bookShow(showId: number, userId: number): Promise<Show> {
    const show = await this.showRepository.findOne<Show>(showId);
    if (!show) {
      throw new NotFoundException('해당하는 공연을 찾을 수 없습니다.');
    }

    const user = this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    if (user.point < show.price) {
      throw new BadRequestException('보유 포인트가 부족합니다.');
    }

    user.point -= show.price;
    this.userService.save(user);

    return show;
  }
}
