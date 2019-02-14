import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Meter} from '../models';
import {MeterRepository} from '../repositories';

export class MeterController {
  constructor(
    @repository(MeterRepository)
    public meterRepository : MeterRepository,
  ) {}

  @post('/meters', {
    responses: {
      '200': {
        description: 'Meter model instance',
        content: {'application/json': {schema: {'x-ts-type': Meter}}},
      },
    },
  })
  async create(@requestBody() meter: Meter): Promise<Meter> {
    return await this.meterRepository.create(meter);
  }

  @get('/meters/count', {
    responses: {
      '200': {
        description: 'Meter model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Meter)) where?: Where,
  ): Promise<Count> {
    return await this.meterRepository.count(where);
  }

  @get('/meters', {
    responses: {
      '200': {
        description: 'Array of Meter model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Meter}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Meter)) filter?: Filter,
  ): Promise<Meter[]> {
    return await this.meterRepository.find(filter);
  }

  @patch('/meters', {
    responses: {
      '200': {
        description: 'Meter PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() meter: Meter,
    @param.query.object('where', getWhereSchemaFor(Meter)) where?: Where,
  ): Promise<Count> {
    return await this.meterRepository.updateAll(meter, where);
  }

  @get('/meters/{id}', {
    responses: {
      '200': {
        description: 'Meter model instance',
        content: {'application/json': {schema: {'x-ts-type': Meter}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Meter> {
    return await this.meterRepository.findById(id);
  }

  @patch('/meters/{id}', {
    responses: {
      '204': {
        description: 'Meter PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() meter: Meter,
  ): Promise<void> {
    await this.meterRepository.updateById(id, meter);
  }

  @put('/meters/{id}', {
    responses: {
      '204': {
        description: 'Meter PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() meter: Meter,
  ): Promise<void> {
    await this.meterRepository.replaceById(id, meter);
  }

  @del('/meters/{id}', {
    responses: {
      '204': {
        description: 'Meter DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.meterRepository.deleteById(id);
  }
}
