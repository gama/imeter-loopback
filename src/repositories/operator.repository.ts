import {DefaultCrudRepository} from '@loopback/repository';
import {Operator} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OperatorRepository extends DefaultCrudRepository<
  Operator,
  typeof Operator.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Operator, dataSource);
  }
}
