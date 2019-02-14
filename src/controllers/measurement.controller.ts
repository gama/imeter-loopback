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
import {Measurement} from '../models';
import {MeasurementRepository} from '../repositories';

export class MeasurementController {
  constructor(
    @repository(MeasurementRepository)
    public measurementRepository : MeasurementRepository,
  ) {}

  @post('/measurements', {
    responses: {
      '200': {
        description: 'Measurement model instance',
        content: {'application/json': {schema: {'x-ts-type': Measurement}}},
      },
    },
  })
  async create(@requestBody() measurement: Measurement): Promise<Measurement> {
    return await this.measurementRepository.create(measurement);
  }

  @get('/measurements/count', {
    responses: {
      '200': {
        description: 'Measurement model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Measurement)) where?: Where,
  ): Promise<Count> {
    return await this.measurementRepository.count(where);
  }

  @get('/measurements', {
    responses: {
      '200': {
        description: 'Array of Measurement model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Measurement}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Measurement)) filter?: Filter,
  ): Promise<Measurement[]> {
    return await this.measurementRepository.find(filter);
  }

  @patch('/measurements', {
    responses: {
      '200': {
        description: 'Measurement PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() measurement: Measurement,
    @param.query.object('where', getWhereSchemaFor(Measurement)) where?: Where,
  ): Promise<Count> {
    return await this.measurementRepository.updateAll(measurement, where);
  }

  @get('/measurements/{id}', {
    responses: {
      '200': {
        description: 'Measurement model instance',
        content: {'application/json': {schema: {'x-ts-type': Measurement}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Measurement> {
    return await this.measurementRepository.findById(id);
  }

  @patch('/measurements/{id}', {
    responses: {
      '204': {
        description: 'Measurement PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() measurement: Measurement,
  ): Promise<void> {
    await this.measurementRepository.updateById(id, measurement);
  }

  @put('/measurements/{id}', {
    responses: {
      '204': {
        description: 'Measurement PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() measurement: Measurement,
  ): Promise<void> {
    await this.measurementRepository.replaceById(id, measurement);
  }

  @del('/measurements/{id}', {
    responses: {
      '204': {
        description: 'Measurement DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.measurementRepository.deleteById(id);
  }
}
