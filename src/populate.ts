import { inspect as i } from 'util';
import { repository, Filter } from '@loopback/repository';
import { IMeterApp } from './application';
import { Customer, Location, Meter } from './models';

import { CustomerRepository }    from './repositories';
import { OperatorRepository }    from './repositories';
import { LocationRepository }    from './repositories';
import { MeterRepository }       from './repositories';
import { MeasurementRepository } from './repositories';

import customers    from './datasources/seed/customers.json';
import operators    from './datasources/seed/operators.json';
import locations    from './datasources/seed/locations.json';
import meters       from './datasources/seed/meters.json';
import measurements from './datasources/seed/measurements.json';


async function populate(args: string[]) {
  const app = new IMeterApp();
  await app.boot();
  await populateCustomers(app);
  await populateOperators(app);
  await populateLocations(app);
  await populateMeters(app);
  await populateMeasurements(app);
  process.exit(0);
}

async function populateCustomers(app: IMeterApp) {
  const Customers : CustomerRepository = await app.get('repositories.CustomerRepository');

  const createdCustomers = (await Promise.all(customers.map(async (customer) => {
    if (await Customers.findOne({where: {name: customer.name}}))
      return;

    return await Customers.create(customer);
  }))).filter(Boolean);

  printModelsTable(createdCustomers, 'Customers');
  return createdCustomers;
}

async function populateOperators(app: IMeterApp) {
  const Operators : OperatorRepository = await app.get('repositories.OperatorRepository');

  const createdOperators = (await Promise.all(operators.map(async (operator) => {
    if (await Operators.findOne({where: {firstName: operator.firstName, lastName: operator.lastName}}))
      return;

    return await Operators.create(operator);
  }))).filter(Boolean);

  printModelsTable(createdOperators, 'Operators');
  return createdOperators;
}

async function populateLocations(app: IMeterApp) {
  const Customers : CustomerRepository = await app.get('repositories.CustomerRepository');
  const Locations : LocationRepository = await app.get('repositories.LocationRepository');

  const createdLocations = (await Promise.all(locations.map(async (location) => {
    if (await Locations.findOne({where: {name: location.name}}))
      return;

    let { customer: locationCustomer, ...attrs} = location;
    const customer  = await Customers.findOne({where: {name: locationCustomer}});
    return await Locations.create({...attrs, customerId: customer ? customer.id : undefined});
  }))).filter(Boolean);

  printModelsTable(createdLocations, 'Locations');
  return createdLocations;
}

async function populateMeters(app: IMeterApp) {
  const Locations : LocationRepository = await app.get('repositories.LocationRepository');
  const Meters    : MeterRepository    = await app.get('repositories.MeterRepository');

  const createdMeters = (await Promise.all(meters.map(async (meter) => {
    if (await Meters.findOne({where: {serialNumber: meter.serialNumber}}))
      return;

    let { location: meterLocation, ...attrs} = meter;
    const location  = await Locations.findOne({where: {name: meterLocation}});
    return await Meters.create({...attrs, locationId: location ? location.id : undefined});
  }))).filter(Boolean);

  printModelsTable(createdMeters, 'Meters');
  return createdMeters;
}

async function populateMeasurements(app: IMeterApp) {
  const Operators: OperatorRepository       = await app.get('repositories.OperatorRepository');
  const Meters: MeterRepository             = await app.get('repositories.MeterRepository');
  const Measurements: MeasurementRepository = await app.get('repositories.MeasurementRepository');

  const createdMeasurements = (await Promise.all(measurements.map(async (measurement) => {
    const { meter: measureMeter, operator: measureOperator, ...attrs } = measurement;
    const meter    = await Meters.findOne({where: {serialNumber: measureMeter}});
    const operator = await Operators.findOne({where: {firstName: measureOperator}});
    const filter   = {where: {meterId: meter!.id, operatorId: operator!.id, timestamp: measurement.timestamp}};
    if (await Measurements.findOne(filter))
      return;

    return await Measurements.create({
      ...attrs,
      meterId:    meter    ? meter.id    : undefined,
      operatorId: operator ? operator.id : undefined
    })
  }))).filter(Boolean);

  printModelsTable(createdMeasurements, 'Operators');
  return createdMeasurements;
}

function printModelsTable(models:any[], label:string) {
  if (!models || models.length === 0)
    return;

  console.log('----- ', label, ' -----');
  console.table(models);
  console.log();
}


// ----- main -----
populate(process.argv).catch(err => {
  console.error('Cannot populate database', err);
  process.exit(1);
});
