import { MadreEntity } from "src/modules/madres/entities/madre.entity";
import { TerneroEntity } from "src/modules/terneros/entities/ternero.entity";
import { Column, Entity,ManyToMany,OneToMany,PrimaryGeneratedColumn } from "typeorm";

@Entity('padres')
export class PadreEntity {
    
    @PrimaryGeneratedColumn()
    id_padre: number;
  
    @Column({nullable:false,type: 'varchar'})
    nombre: string;

    @Column({nullable:false,type: 'integer'})
    rp_padre: number;

    @Column({ type: "enum", enum: ["Vivo", "Muerto"] })
    estado: string;

    @Column({nullable:false,type: 'varchar'})
    observaciones: string;

    @Column({nullable:false,type: 'varchar'})
    semen: string;

    @Column({ type: 'date',nullable:false})
    fecha_nacimiento: Date;

    // Relación de muchos a muchos con Madres
    @ManyToMany(()=> MadreEntity,(madre) => madre.padres)
    madres: MadreEntity[];

    // Relación de uno a muchos con Terneres
    @OneToMany(() => TerneroEntity, (ternero) => ternero.padre, { onDelete: 'CASCADE' })
    terneros: TerneroEntity[];


}

