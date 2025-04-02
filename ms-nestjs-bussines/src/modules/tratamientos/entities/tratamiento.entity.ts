import { TerneroTratamientoEntity } from "src/modules/terneros-tratamientos/entities/terneros-tratamiento.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tratamientos')
export class TratamientoEntity {
  
    @PrimaryGeneratedColumn()
    id_tratamiento: number;
  
    @Column({ type: 'varchar', length: 255, nullable: false })  
    nombre: string;

    @Column({ type: 'varchar', length: 255, nullable: false })  
    descripcion: string;

    @Column({ type: 'date',nullable:false})
    fecha_tratamiento: Date;

    @OneToMany(() => TerneroTratamientoEntity, (terneroTratamiento) => terneroTratamiento.tratamiento)
    ternerosTratamientos: TerneroTratamientoEntity[]; 
    
}

