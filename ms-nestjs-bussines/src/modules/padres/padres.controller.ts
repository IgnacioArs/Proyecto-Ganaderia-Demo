import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PadresService } from './padres.service';
import { CreatePadreDto } from './dto/create-padre.dto';
import { UpdatePadreDto } from './dto/update-padre.dto';

@ApiBearerAuth() 
@UseGuards(JwtAuthGuard)
@ApiTags('Padres-De-Terneros')
@Controller('padres')
export class PadresController {
  constructor(private readonly padresService: PadresService) {}

  @Post('crear-padre')
  @ApiOperation({
    summary:
      'servicio para crear un padre',
  })
  @ApiBody({ type: CreatePadreDto })
  async create(@Body() createPadreDto: CreatePadreDto) {
    return this.padresService.create(createPadreDto);
  }

  @Get('/obtener-listado-padres')
  @ApiOperation({
    summary:
      'Este servicio trae listado de todos los padres',
  })
  async findAll() {
    return this.padresService.findAll();
  }

  @Get('/get-padre-by-id/:id_padre')
  @ApiOperation({ 
    summary: 'Devuelve una padre por id_padre' 
  })
  @ApiParam({
    name: 'id_padre',
    description: 'Código único id de la padre',
  })
  async findOne(@Param('id_padre') id_padre: string) {
    return this.padresService.findOne(+id_padre);
  }

  @Patch('/patch-padre-by-id/:id_padre')
  @ApiOperation({
    summary:
      'servicio para actualizar un padre por id_padre',
  })
  @ApiParam({
    name: 'id_padre',
    description: 'Código único id_padre',
  })
  @ApiBody({ type: UpdatePadreDto })
  async update(@Param('id_padre') id_padre: string, @Body() updatePadreDto: UpdatePadreDto) {
    return this.padresService.update(+id_padre, updatePadreDto);
  }

  @Delete('/delete-padre-by-id/:id_padre')
  @ApiOperation({
    summary:
      'Proceso que elimina un padre por id_padre',
  })
  @ApiParam({
    name: 'id_padre',
    description: 'Código único id_padre.',
  })
  async remove(@Param('id_padre') id_padre: string) {
    return this.padresService.remove(+id_padre);
  }
}
