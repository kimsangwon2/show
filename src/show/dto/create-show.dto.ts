import { Category } from '../types/showRole.type';

export class CreateShowDto {
  name: string;
  info: string;
  datetime: string[];
  place: string;
  seatinfo: string;
  image: string;
  category: Category;
  price: number;
}
