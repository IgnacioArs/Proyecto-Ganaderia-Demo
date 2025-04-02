import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTratamientoDto } from './dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TratamientoEntity } from './entities/tratamiento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TratamientosService {
  constructor(
    @InjectRepository(TratamientoEntity)
    private readonly tratamientoRepository:Repository<TratamientoEntity>
  ){}
  async create(createTratamientoDto: CreateTratamientoDto) {
      try {
          if(createTratamientoDto){
            const resCreateTratamiento = await this.tratamientoRepository.create(createTratamientoDto);
            const tratamientoSave = await this.tratamientoRepository.save(resCreateTratamiento);
            return tratamientoSave;
          }
      } catch (error) {
        throw new HttpException(`Error al crear el tratamiento: ${error.message}`, HttpStatus.CONFLICT);
      }
    }
  
  
    async findAll(): Promise<TratamientoEntity[]> {
      try {
        const tratamientosArray = await this.tratamientoRepository.find({
          relations:['ternerosTratamientos']
        });
        return tratamientosArray;
      } catch (error) {
        throw new HttpException(
          `Error al obtener los tratramientos: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
    
    async findOne(id: number): Promise<TratamientoEntity> {
      try {
        const Tratamiento = await this.tratamientoRepository.findOne({
          where: { id_tratamiento:id }, // Asegúrate de usar "id" y no 
          relations:['ternerosTratamientos']
        });
    
        if (!Tratamiento) {
          throw new HttpException('Tratamiento no encontrada', HttpStatus.NOT_FOUND);
        }
    
        return Tratamiento;
      } catch (error) {
        throw new HttpException(
          `Error al obtener el tratamiento con el ID ${id}: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
    
    
  
    async update(id: number, updateTratamientoDto: UpdateTratamientoDto): Promise<TratamientoEntity> {
      try {
        // Buscar la tratamiento por ID
        const tratamiento = await this.tratamientoRepository.findOne({where:{
          id_tratamiento:id
        }});
  
        // Si no se encuentra la tratamiento, lanzamos una excepción con un error 404
        if (!tratamiento) {
          throw new HttpException('Tratamiento no encontrada', HttpStatus.NOT_FOUND);
        }
  
        // Actualizar la tratamiento con los datos proporcionados
        const updatedTratamiento = Object.assign(tratamiento, updateTratamientoDto);
        const savedTratamiento = await this.tratamientoRepository.save(updatedTratamiento);
  
        return savedTratamiento;
      } catch (error) {
        // Si ocurre algún error, lanzamos una excepción con un error 500
        throw new HttpException(`Error al actualizar la tratamiento con ID ${id}: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    async remove(id: number): Promise<{ message: string }> {
      try {
        // Buscar la madre
        const tratamiento = await this.tratamientoRepository.findOne({ where: {id_tratamiento: id } });
    
        if (!tratamiento) {
          throw new HttpException('Tratamiento no encontrado', HttpStatus.NOT_FOUND);
        }
    
        // Eliminar la tratamiento (los terneros quedarán con tratamientoId = NULL)
        await this.tratamientoRepository.remove(tratamiento);
    
        return { message: 'Tratamiento eliminado con éxito, pero sus Tratamientos Terneros siguen existiendo' };
      } catch (error) {
        throw new HttpException(
          `Error al eliminar la tratamiento con el ID ${id}: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
}
