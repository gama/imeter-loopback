import {DefaultCrudRepository} from '@loopback/repository';
import {Meter} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MeterRepository extends DefaultCrudRepository<
  Meter,
  typeof Meter.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Meter, dataSource);
  }
}
