import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreatePadreDto } from './create-padre.dto';

export class UpdatePadreDto extends PartialType(CreatePadreDto) {
        
        @ApiProperty({ description: 'Nombre del padre', example: 'javier' })
        @IsNotEmpty()
        @IsString()
        nombre: string;
      
        @ApiProperty({ description: 'RP del padre', example: 1023 })
        @IsNotEmpty()
        @IsNumber()
        rp_padre: number;
      
        @ApiProperty({ description: 'Estado del padre', example: 'Vivo', enum: ['Vivo', 'Muerto'] })
        @IsNotEmpty()
        @IsEnum(["Vivo", "Muerto"])
        estado: string;
      
        @ApiProperty({ description: 'Observaciones sobre el padre', example: 'Padre con buena producción de semen' })
        @IsNotEmpty()
        @IsString()
        observaciones: string;
    
        @ApiProperty({ description: 'Informacion semen del padre', example: 'Tipo de semen X95D84E' })
        @IsNotEmpty()
        @IsString()
        semen: string;
    
        @ApiProperty({ description: 'Fecha nacimiento del padre', example: '2024-02-27' })
        @IsNotEmpty()
        @IsString()
        fecha_nacimiento: string;
}
