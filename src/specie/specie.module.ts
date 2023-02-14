import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpecieService } from './specie.service';
import { SpecieResolver } from './specie.resolver';
import { Specie } from './entities/specie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Specie])],
  providers: [SpecieResolver, SpecieService],
})
export class SpecieModule {}
