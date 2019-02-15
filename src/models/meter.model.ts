import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Location} from './location.model';
import {Measurement} from './measurement.model';

@model()
export class Meter extends Entity {
  @property({ type: 'number', id: true, generated: true })
  id: number;

  @property({ type: 'string', required: true, })
  kind: string;

  @property({ type: 'string', required: true })
  serialNumber: string;

  @property({ type: 'string', required: true })
  model: string;

  @belongsTo(() => Location)
  locationId: number;

  @hasMany(() => Measurement)
  measurements?: Measurement[];

  constructor(data?: Partial<Meter>) {
    super(data);
  }
}
