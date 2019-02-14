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
import {Operator} from '../models';
import {OperatorRepository} from '../repositories';

export class OperatorController {
  constructor(
    @repository(OperatorRepository)
    public operatorRepository : OperatorRepository,
  ) {}

  @post('/operators', {
    responses: {
      '200': {
        description: 'Operator model instance',
        content: {'application/json': {schema: {'x-ts-type': Operator}}},
      },
    },
  })
  async create(@requestBody() operator: Operator): Promise<Operator> {
    return await this.operatorRepository.create(operator);
  }

  @get('/operators/count', {
    responses: {
      '200': {
        description: 'Operator model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Operator)) where?: Where,
  ): Promise<Count> {
    return await this.operatorRepository.count(where);
  }

  @get('/operators', {
    responses: {
      '200': {
        description: 'Array of Operator model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Operator}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Operator)) filter?: Filter,
  ): Promise<Operator[]> {
    return await this.operatorRepository.find(filter);
  }

  @patch('/operators', {
    responses: {
      '200': {
        description: 'Operator PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() operator: Operator,
    @param.query.object('where', getWhereSchemaFor(Operator)) where?: Where,
  ): Promise<Count> {
    return await this.operatorRepository.updateAll(operator, where);
  }

  @get('/operators/{id}', {
    responses: {
      '200': {
        description: 'Operator model instance',
        content: {'application/json': {schema: {'x-ts-type': Operator}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Operator> {
    return await this.operatorRepository.findById(id);
  }

  @patch('/operators/{id}', {
    responses: {
      '204': {
        description: 'Operator PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() operator: Operator,
  ): Promise<void> {
    await this.operatorRepository.updateById(id, operator);
  }

  @put('/operators/{id}', {
    responses: {
      '204': {
        description: 'Operator PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() operator: Operator,
  ): Promise<void> {
    await this.operatorRepository.replaceById(id, operator);
  }

  @del('/operators/{id}', {
    responses: {
      '204': {
        description: 'Operator DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.operatorRepository.deleteById(id);
  }
}
