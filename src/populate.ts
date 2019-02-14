import { repository } from '@loopback/repository';
import { IMeterApp } from './application';
import { Customer, Location } from './models';
import { CustomerRepository, LocationRepository } from './repositories';

const customers = [
  {name: 'Condomínio Alphaville'},
  {name: 'Condomínio Grande Olympus'},
  {name: 'Condomínio do Seu Zé'},
  {name: 'Condomínio Arvoredo'},
];

const locations = [
  {customer: 'Condomínio Alphaville'},
  {customer: 'Condomínio do Seu Zé'}
];

export async function populateCustomers(app: IMeterApp) {
  const repository:CustomerRepository = await app.get('repositories.CustomerRepository');
  return customers.map(async (customer) => {
    return await repository.create(customer)
  })
}

export async function populateLocations(app: IMeterApp) {
  const repository:LocationRepository = await app.get('repositories.LocationRepository');
  return locations.map(async (location) => {
    const customer = customers.find((customer) => customer.name === location.customer)
    return await repository.create(location)
  })
}

export async function migrate(args: string[]) {
  const app = new IMeterApp();
  await app.boot();

  const customers = await populateCustomers(app);
  const locations = await populateLocations(app);

  console.log(customers, locations);
  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});
