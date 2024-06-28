import find from "lodash.find";
import remove from "lodash.remove";

const ownersArray = [
  {
    id: "1",
    firstName: "Bill",
    lastName: "Gates",
  },
  {
    id: "2",
    firstName: "Steve",
    lastName: "Jobs",
  },
  {
    id: "3",
    firstName: "Linux",
    lastName: "Torvalds",
  },
];

const carsArray = [
  {
    id: "1",
    year: "2019",
    make: "Toyota",
    model: "Corolla",
    price: "40000",
    personId: "1",
  },
  {
    id: "2",
    year: "2018",
    make: "Lexus",
    model: "LX 600",
    price: "13000",
    personId: "1",
  },
  {
    id: "3",
    year: "2017",
    make: "Honda",
    model: "Civic",
    price: "20000",
    personId: "1",
  },
  {
    id: "4",
    year: "2019",
    make: "Acura ",
    model: "MDX",
    price: "60000",
    personId: "2",
  },
  {
    id: "5",
    year: "2018",
    make: "Ford",
    model: "Focus",
    price: "35000",
    personId: "2",
  },
  {
    id: "6",
    year: "2017",
    make: "Honda",
    model: "Pilot",
    price: "45000",
    personId: "2",
  },
  {
    id: "7",
    year: "2019",
    make: "Volkswagen",
    model: "Golf",
    price: "40000",
    personId: "3",
  },
  {
    id: "8",
    year: "2018",
    make: "Kia",
    model: "Sorento",
    price: "45000",
    personId: "3",
  },
  {
    id: "9",
    year: "2017",
    make: "Volvo",
    model: "XC40",
    price: "55000",
    personId: "3",
  },
];

const typeDefs = `
  type Owner {
    id: String!
    firstName: String
    lastName: String
    cars: [Car]
  }

  type Car {
    id: String!
    year: Int
    make: String
    model: String
    price: Float
    personId: String
  }

  type Query {
    owner(id: String!): Owner
    owners: [Owner]

    car(id: String!): Car
    cars(personId: String): [Car]

    ownerWithCars(id: String!): Owner
  }

  type Mutation {
    addOwner(id: String!, firstName: String!, lastName: String!): Owner
    updateOwner(id: String!, firstName: String!, lastName: String!): Owner
    removeOwner(id: String!): Owner

    addCar(id: String!, year: Int, make: String, model: String, price: Float, personId: String): Car
    updateCar(id: String!, year: Int, make: String, model: String, price: Float, personId: String): Car
    removeCar(id: String!): Car
  }
`;

const resolvers = {
  Query: {
    owners: () => ownersArray,
    owner(root, args) {
      return find(ownersArray, { id: args.id });
    },
    cars: (root, args) => {
      if (!args.personId) {
        return carsArray;
      }

      return carsArray.filter((car) => car.personId === args.personId);
    },
    car(root, args) {
      return find(carsArray, { id: args.id });
    },
    ownerWithCars(root, args) {
      const owner = find(ownersArray, { id: args.id });
      const cars = carsArray.filter((car) => car.personId === args.id);

      return {
        ...owner,
        cars,
      };
    },
  },
  Mutation: {
    addOwner: (root, args) => {
      const person = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
      };

      ownersArray.push(person);
      return person;
    },
    updateOwner: (root, args) => {
      const person = find(ownersArray, { id: args.id });

      if (!person) {
        throw Error(`Couldn\'t find owner with id ${args.id}`);
      }

      person.firstName = args.firstName;
      person.lastName = args.lastName;

      return person;
    },
    removeOwner: (root, args) => {
      const person = find(ownersArray, { id: args.id });

      if (!person) {
        throw Error(`Couldn\'t find person with id ${args.id}`);
      }

      remove(ownersArray, (c) => {
        return c.id == person.id;
      });

      return person;
    },

    addCar: (root, args) => {
      const car = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId,
      };

      carsArray.push(car);

      return car;
    },
    updateCar: (root, args) => {
      const car = find(carsArray, { id: args.id });

      if (!car) {
        throw Error(`Couldn\'t find car with id ${args.id}`);
      }

      car.year = args.year;
      car.make = args.make;
      car.model = args.model;
      car.price = args.price;
      car.personId = args.personId;

      return car;
    },
    removeCar: (root, args) => {
      const car = find(carsArray, { id: args.id });

      if (!car) {
        throw Error(`Couldn\'t find car with id ${args.id}`);
      }

      remove(carsArray, (c) => {
        return c.id == car.id;
      });

      return car;
    },
  },
};

export { typeDefs, resolvers };
