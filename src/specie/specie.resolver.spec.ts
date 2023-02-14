import { Test, TestingModule } from '@nestjs/testing';
import { SpecieResolver } from './specie.resolver';
import { SpecieService } from './specie.service';

describe('SpecieResolver', () => {
  let resolver: SpecieResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecieResolver, SpecieService],
    }).compile();

    resolver = module.get<SpecieResolver>(SpecieResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
