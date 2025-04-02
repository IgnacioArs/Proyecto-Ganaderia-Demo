import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTerneroDto } from './dto/create-ternero.dto';
import { UpdateTerneroDto } from './dto/update-ternero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TerneroEntity } from './entities/ternero.entity';
import { Repository } from 'typeorm';
import { MadreEntity } from '../madres/entities/madre.entity';
import { PadreEntity } from '../padres/entities/padre.entity';


@Injectable()
export class TernerosService {

  constructor(
    @InjectRepository(TerneroEntity)
    private readonly terneroRepository:Repository<TerneroEntity>,
    @InjectRepository(MadreEntity)
    private readonly madreRepository:Repository<MadreEntity>,
    @InjectRepository(PadreEntity)
    private readonly padreRepository:Repository<PadreEntity>
  ){}

async create(createTerneroDto: CreateTerneroDto): Promise<TerneroEntity> {
    // Buscar la madre en la base de datos
    const madre = await this.madreRepository.findOne({
        where: { id_madre: createTerneroDto.id_madre },
    });

    if (!madre) {
        throw new Error(`No se encontró la madre con ID ${createTerneroDto.id_madre}`);
    }


    // Buscar al padre en la base de datos
    const padre = await this.padreRepository.findOne({
          where: { id_padre: createTerneroDto.id_padre },
    });
  
    if (!padre) {
          throw new Error(`No se encontró al padre con ID ${createTerneroDto.id_padre}`);
    }

    // Crear el ternero y asignar la madre
    const nuevoTernero = this.terneroRepository.create({
        ...createTerneroDto,
        madre,  // Asigna la relación con la madre
        padre // Asigna la relación con el padre
    });

    return this.terneroRepository.save(nuevoTernero);
}

  
    async findAll(): Promise<TerneroEntity[]> {
      try {
        const terneroList = await this.terneroRepository.find({
          relations:['padre','madre','eventos']
        });
        return terneroList;
      } catch (error) {
  
        throw new HttpException(`Error al obtener los terneros: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    async findOne(id: number): Promise<TerneroEntity> {
      try {
  
        const ternero = await this.terneroRepository.findOne({where:{id_ternero:id},
        relations:['padre','madre','eventos'] 
        });
  
        if (!ternero) {
          throw new HttpException('Ternero no encontrado', HttpStatus.NOT_FOUND);
        }
  
        return ternero;
      } catch (error) {
     
        throw new HttpException(`Error al obtener el ternero con el ID ${id}: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    async update(id: number, updateTerneroDto: UpdateTerneroDto): Promise<TerneroEntity> {
      try {
        // Buscar el ternero por ID
        const ternero = await this.terneroRepository.findOne({
          where: { id_ternero: id },
          relations: ['madre'], // Asegura que la relación madre se cargue
        });
    
        if (!ternero) {
          throw new HttpException('Ternero no encontrado', HttpStatus.NOT_FOUND);
        }
    
        // Si el DTO contiene un nuevo id_madre, buscamos la madre
        if (updateTerneroDto.id_madre) {
          const nuevaMadre = await this.madreRepository.findOne({
            where: { id_madre: updateTerneroDto.id_madre },
          });
    
          if (!nuevaMadre) {
            throw new HttpException('La nueva madre no existe', HttpStatus.NOT_FOUND);
          }
    
          ternero.madre = nuevaMadre; // Asignamos la nueva madre
        }


        // Si el DTO contiene un nuevo id_padre, buscamos al padre
        if (updateTerneroDto.id_padre) {
          const nuevoPadre = await this.padreRepository.findOne({
              where: { id_padre: updateTerneroDto.id_padre },
          });
            
          if (!nuevoPadre) {
             throw new HttpException('El nuevo padre no existe', HttpStatus.NOT_FOUND);
          }
            
          ternero.padre = nuevoPadre; // Asignamos la nueva madre
        }
    
        // Actualizamos otros campos del ternero
        Object.assign(ternero, updateTerneroDto);
    
        return await this.terneroRepository.save(ternero);
      } catch (error) {
        throw new HttpException(
          `Error al actualizar el ternero con ID ${id}: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    
  
    async remove(id: number): Promise<{ message: string }> {
      try {
        // Buscar la Ternero por ID
        const Ternero = await this.terneroRepository.findOne({where:{
          id_ternero:id
        }});
  
        // Si no se encuentra la Ternero, lanzamos una excepción con un error 404
        if (!Ternero) {
          throw new HttpException('Ternero no encontrado', HttpStatus.NOT_FOUND);
        }
  
        // Eliminar la Ternero
        await this.terneroRepository.remove(Ternero);
  
        return { message: 'Ternero eliminado con éxito' };
      } catch (error) {
      
        throw new HttpException(`Error al eliminar el Ternero con ID ${id}: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}
