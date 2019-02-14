import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Meter} from './meter.model';
import {Operator} from './operator.model';

@model()
export class Measurement extends Entity {
  @property({ type: 'number', id: true, required: true, generated: true })
  id: number;

  @property({ type: 'date', required: true })
  timestamp: string;

  @property({ type: 'number', required: true })
  value: number;

  @belongsTo(() => Meter)
  meterId: number;

  @belongsTo(() => Operator)
  operatorId: number;

  constructor(data?: Partial<Measurement>) {
    super(data);
  }
}
