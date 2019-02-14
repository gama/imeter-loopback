import {DefaultCrudRepository} from '@loopback/repository';
import {Location} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class LocationRepository extends DefaultCrudRepository<
  Location,
  typeof Location.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Location, dataSource);
  }
}
