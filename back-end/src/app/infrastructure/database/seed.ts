import mongoose from 'mongoose';
import user from './models/user';
import driver from './models/driver';
import ride from './models/ride';

const seedDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL ?? 'mongodb://localhost:27017/rides'
    );

    const users = [{ id: '12inas@33', name: 'Ximira' }];

    const drivers = [
      {
        id: 1,
        name: 'Homer Simpson',
        description:
          'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
        vehicle: 'Plymouth Valiant 1973 rosa e enferrujado',
        review: {
          rating: 2,
          comment:
            'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
        },
        value: 2.5,
        min_distance: 1000,
      },
      {
        id: 2,
        name: 'Dominic Toretto',
        description:
          'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
        vehicle: 'Dodge Charger R/T 1970 modificado',
        review: {
          rating: 4,
          comment:
            'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
        },
        value: 5.0,
        min_distance: 5000,
      },
      {
        id: 3,
        name: 'James Bond',
        description:
          'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
        vehicle: 'Aston Martin DB5 clássico',
        review: {
          rating: 5,
          comment:
            'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
        },
        value: 10.0,
        min_distance: 10000,
      },
    ];

    await user.deleteMany({});
    await driver.deleteMany({});
    await ride.deleteMany({});

    await user.insertMany(users);
    console.log('Users seeded.');

    await driver.insertMany(drivers);
    console.log('Drivers seeded.');
    console.log('Database seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
