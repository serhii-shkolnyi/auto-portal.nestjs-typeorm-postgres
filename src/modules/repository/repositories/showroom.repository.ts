import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ShowroomEntity } from '../../../database/entities/showroom.entity';

@Injectable()
export class ShowroomRepository extends Repository<ShowroomEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ShowroomEntity, dataSource.manager);
  }
}
