import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ShowService } from './show.service';
import { AdminGuard } from '../admin/admin.guard';
import { Admin } from '../admin/admin.decorator';
import { CreateShowDto } from './dto/create-show.dto';
// import { Show } from './entities/show.entity';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Post()
  @UseGuards(AdminGuard)
  @Admin()
  create(@Body() createShowDto: CreateShowDto) {
    return this.showService.create(createShowDto);
  }

  @Get()
  findAll(@Query('name') name?: string) {
    if (name) {
      return this.showService.findByName(name);
    }
    return this.showService.findAll();
  }

  @Get('search')
  searchByName(@Query('name') name: string) {
    return this.showService.searchByName(name);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.showService.findOne(+id);
  }
}
