import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TratamientosService } from './tratamientos.service';
import { CreateTratamientoDto } from './dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth() 
@UseGuards(JwtAuthGuard)
@ApiTags('Tratamientos')
@Controller('tratamientos')
export class TratamientosController {
  constructor(private readonly tratamientosService: TratamientosService) {}

 
   @Post('crear-tratamiento')
   @ApiOperation({
     summary:
       'servicio para crear un tratamiento',
   })
   @ApiBody({ type: CreateTratamientoDto })
   async create(@Body() CreateTratamientoDto: CreateTratamientoDto) {
     return this.tratamientosService.create(CreateTratamientoDto);
   }
 
   @Get('/obtener-listado-tratamientos')
   @ApiOperation({
     summary:
       'Este servicio trae listado de todas los tratamientos',
   })
   async findAll() {
     return this.tratamientosService.findAll();
   }
 
   @Get('/get-tratamiento-by-id/:id_tratamiento')
   @ApiOperation({ 
     summary: 'Devuelve un tratamiento por id_tratamiento' 
   })
   @ApiParam({
     name: 'id_tratamiento',
     description: 'Código único id del tratamiento',
   })
   async findOne(@Param('id_tratamiento') id_tratamiento: string) {
     return this.tratamientosService.findOne(+id_tratamiento);
   }
 
   @Patch('/patch-tratamiento-by-id/:id_tratamiento')
   @ApiOperation({
     summary:
       'servicio para actualizar una madre por id_tratamiento',
   })
   @ApiParam({
     name: 'id_tratamiento',
     description: 'Código único id_tratamiento',
   })
   @ApiBody({ type: UpdateTratamientoDto })
   async update(@Param('id_tratamiento') id_tratamiento: string, @Body() updateTratamientoDto: UpdateTratamientoDto) {
     return this.tratamientosService.update(+id_tratamiento, updateTratamientoDto);
   }
 
   @Delete('/delete-tratamiento-by-id/:id_tratamiento')
   @ApiOperation({
     summary:
       'Proceso que elimina a tratamiento por id_tratamiento',
   })
   @ApiParam({
     name: 'id_tratamiento',
     description: 'Código único id_tratamiento.',
   })
   async remove(@Param('id_tratamiento') id_tratamiento: string) {
     return this.tratamientosService.remove(+id_tratamiento);
   }
}
