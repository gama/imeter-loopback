import {Entity, model, property, hasMany} from '@loopback/repository';
import {Measurement} from './measurement.model';

@model()
export class Operator extends Entity {
  @property({ type: 'number', id: true, required: true, generated: true })
  id: number;

  @property({ type: 'string', required: true })
  firstName: string;

  @property({ type: 'string', required: true })
  lastName: string;

  @property({ type: 'string' })
  authToken?: string;

  @hasMany(() => Measurement)
  measurements?: Measurement[];

  constructor(data?: Partial<Operator>) {
    super(data);
  }
}
