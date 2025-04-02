import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/jwt.strategy';
import { TerneroEntity } from '../terneros/entities/ternero.entity';
import { PadresController } from './padres.controller';
import { PadresService } from './padres.service';
import { MadreEntity } from '../madres/entities/madre.entity';
import { PadreEntity } from './entities/padre.entity';


@Module({
  imports:[TypeOrmModule.forFeature([PadreEntity,MadreEntity,TerneroEntity])],
  controllers: [PadresController],
  providers: [PadresService,JwtStrategy],
})
export class PadresModule {}
