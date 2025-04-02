import { Column, Entity, JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,PrimaryGeneratedColumn } from "typeorm";
import { MadreEntity } from "src/modules/madres/entities/madre.entity";
import { EventoEntity } from "src/modules/eventos/entities/evento.entity";
import { TerneroTratamientoEntity } from "src/modules/terneros-tratamientos/entities/terneros-tratamiento.entity";
import { DiarreaTerneroEntity } from "src/modules/diarrea-terneros/entities/diarrea-ternero.entity";
import { PadreEntity } from "src/modules/padres/entities/padre.entity";

@Entity('terneros')
export class TerneroEntity {

    @PrimaryGeneratedColumn()
    id_ternero: number;

    @Column({type:'integer',nullable: false})
    rp_ternero: number;

    @Column({ type: "enum", enum: ["Macho", "Hembra"] })
    sexo: string;

    @Column({ type: "enum", enum: ["Vivo", "Muerto"] })
    estado: string;

    @Column({ type: "float", nullable: false })
    peso_nacer: number;

    @Column({ type: "float", nullable: false })
    peso_15d: number;

    @Column({ type: "float", nullable: false })
    peso_30d: number;

    @Column({ type: "float", nullable: false })
    peso_45d: number;

    @Column({ type: "float", nullable: false })
    peso_largado: number;

    @Column({ type: "float", nullable: false })
    estimativo: number;

    @Column({ type: "varchar", nullable: false })
    observaciones: string;

    @Column({ type: 'date',nullable:false})
    fecha_nacimiento: Date;

    @ManyToOne(() => MadreEntity, (madre) => madre.terneros, { 
        onDelete: 'SET NULL', // Permite que id_madre quede NULL al eliminar la madre
        nullable: true // Hace que el campo pueda aceptar valores nulos
    })
    @JoinColumn({ name: 'id_madre' })
    madre: MadreEntity;

    // Relación de muchos a muchos con Evento
    @ManyToMany(()=> EventoEntity,(evento) => evento.terneros)
    eventos: EventoEntity[];

    @OneToMany(()=> TerneroTratamientoEntity ,(tratamiento) => tratamiento.ternero)
    ternerosTratamientos:TerneroTratamientoEntity[]

    @OneToMany(() => DiarreaTerneroEntity, (diarrea) => diarrea.ternero)
    diarreas: DiarreaTerneroEntity[];

    @ManyToOne(() => PadreEntity, (padre) => padre.terneros, { 
        onDelete: 'SET NULL', // Permite que id_padre quede NULL al eliminar la padre
        nullable: true // Hace que el campo pueda aceptar valores nulos
    })
    @JoinColumn({ name: 'id_padre' })
    padre: PadreEntity;
}

