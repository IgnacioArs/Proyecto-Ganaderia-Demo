import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TernerosService } from './terneros.service';
import { CreateTerneroDto } from './dto/create-ternero.dto';
import { UpdateTerneroDto } from './dto/update-ternero.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth() 
@UseGuards(JwtAuthGuard)
@ApiTags('Terneros')
@Controller('terneros')
export class TernerosController {

  constructor(private readonly ternerosService: TernerosService) {}

  @Post('crear-ternero')
  @ApiOperation({
    summary:
      'servicio para crear un ternero',
  })
  @ApiBody({ type: CreateTerneroDto })
  async create(@Body() createTerneroDto: CreateTerneroDto) {
    return this.ternerosService.create(createTerneroDto);
  }

  @Get('/obtener-listado-terneros')
  @ApiOperation({
    summary:
      'Este servicio trae listado de todos los terneros',
  })
  async findAll() {
    return this.ternerosService.findAll();
  }

  @Get('/get-ternero-by-id/:id_ternero')
  @ApiOperation({
     summary: 'Devuelve un ternero por id_ternero' 
  })
  @ApiParam({
    name: 'id_ternero',
    description: 'Código único id_ternero del ternero',
  })
  async findOne(@Param('id_ternero') id_ternero: string) {
    return this.ternerosService.findOne(+id_ternero);
  }

  @Patch('/patch-ternero-by-id/:id_ternero')
  @ApiOperation({
    summary:
      'servicio para actualizar un ternero por id_ternero',
  })
  @ApiParam({
    name: 'id_ternero',
    description: 'Código único id_ternero',
  })
  @ApiBody({ type: UpdateTerneroDto })
  async update(@Param('id_ternero') id_ternero: string, @Body() updateMadreDto: UpdateTerneroDto) {
    return this.ternerosService.update(+id_ternero, updateMadreDto);
  }

  @Delete('/delete-ternero-by-id/:id_ternero')
  @ApiOperation({
    summary:
      'Proceso que  elimina a ternero por id_ternero',
  })
  @ApiParam({
    name: 'id_ternero',
    description: 'Código único id_ternero.',
  })
  async remove(@Param('id_ternero') id_ternero: string) {
    return this.ternerosService.remove(+id_ternero);
  }
}
