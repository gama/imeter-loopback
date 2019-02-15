import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Customer} from './customer.model';
import {Meter} from './meter.model';

@model()
export class Location extends Entity {
  @property({ type: 'number', id: true, required: false, generated: true})
  id: number;

  @property({ type: 'string', required: true })
  name: string;

  @belongsTo(() => Customer)
  customerId: number;

  @hasMany(() => Meter)
  meters?: Meter[];

  constructor(data?: Partial<Location>) {
    super(data);
  }
}
