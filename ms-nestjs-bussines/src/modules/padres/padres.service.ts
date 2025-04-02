import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TerneroEntity } from '../terneros/entities/ternero.entity';
import { CreatePadreDto } from './dto/create-padre.dto';
import { UpdatePadreDto } from './dto/update-padre.dto';
import { PadreEntity } from './entities/padre.entity';
import { MadreEntity } from '../madres/entities/madre.entity';


@Injectable()
export class PadresService {
  constructor(
    @InjectRepository(PadreEntity)
    private readonly padreRepository:Repository<PadreEntity>,
    @InjectRepository(MadreEntity)
    private readonly madreRepository:Repository<MadreEntity>,
    @InjectRepository(TerneroEntity)
    private readonly terneroRepository:Repository<TerneroEntity>
  ){}
  async create(createPadreDto: CreatePadreDto) {
    try {
        if(createPadreDto){
          const resCreatePadre = await this.padreRepository.create(createPadreDto);
          const padreSave = await this.padreRepository.save(resCreatePadre);
          return padreSave;
        }
    } catch (error) {
      throw new HttpException(`Error al crear al padre: ${error.message}`, HttpStatus.CONFLICT);
    }
  }


  async findAll(): Promise<PadreEntity[]> {
    try {
      const padres = await this.padreRepository.find({
        relations: ['madres','terneros'], // Esto funcionará solo si la relación está bien definida
      });
      return padres;
    } catch (error) {
      throw new HttpException(
        `Error al obtener los padres: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  
  async findOne(id: number): Promise<PadreEntity> {
    try {
      const padre = await this.padreRepository.findOne({
        where: { id_padre:id }, // Asegúrate de usar "id" y no "id_padre"
        relations: ['madres','terneros'],
      });
  
      if (!padre) {
        throw new HttpException('Padre no encontrado', HttpStatus.NOT_FOUND);
      }
  
      return padre;
    } catch (error) {
      throw new HttpException(
        `Error al obtener al padre con ID ${id}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  
  

  async update(id: number, updatePadreDto: UpdatePadreDto): Promise<PadreEntity> {
    try {
      // Buscar al padre por ID
      const padre = await this.padreRepository.findOne({where:{
        id_padre:id
      }});

      // Si no se encuentra la padre, lanzamos una excepción con un error 404
      if (!padre) {
        throw new HttpException('Padre no encontrada', HttpStatus.NOT_FOUND);
      }

      // Actualizar al padre con los datos proporcionados
      const updatedPadre = Object.assign(padre, updatePadreDto);
      const savedPadre = await this.padreRepository.save(updatedPadre);

      return savedPadre;
    } catch (error) {
      // Si ocurre algún error, lanzamos una excepción con un error 500
      throw new HttpException(`Error al actualizar al padre con ID ${id}: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      // Buscar al padre
      const padre = await this.padreRepository.findOne({ where: {id_padre: id } });
  
      if (!padre) {
        throw new HttpException('Padre no encontrada', HttpStatus.NOT_FOUND);
      }
  
      // Eliminar la padre (los terneros quedarán con padreId = NULL)
      await this.padreRepository.remove(padre);
  
      return { message: 'Padre eliminado con éxito, pero sus madres terneros siguen existiendo' };
    } catch (error) {
      throw new HttpException(
        `Error al eliminar al padre con ID ${id}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  
  
  
}
