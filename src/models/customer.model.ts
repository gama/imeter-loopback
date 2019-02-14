import {Entity, model, property, hasMany} from '@loopback/repository';
import {Location} from './location.model';

@model()
export class Customer extends Entity {
  @property({ type: 'number', id: true, required: false, generated: true})
  id: number;

  @property({ type: 'string', required: true, })
  name: string;

  @hasMany(() => Location)
  locations?: Location[];

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}
