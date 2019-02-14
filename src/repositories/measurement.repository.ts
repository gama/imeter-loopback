import {DefaultCrudRepository} from '@loopback/repository';
import {Measurement} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MeasurementRepository extends DefaultCrudRepository<
  Measurement,
  typeof Measurement.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Measurement, dataSource);
  }
}
