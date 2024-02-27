import { Global, Module } from '@nestjs/common';

import { ShowroomRepository } from './repositories/showroom.repository';

const repositories = [ShowroomRepository];

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
