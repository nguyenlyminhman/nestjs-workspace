import { GraphQLScalarType } from 'graphql';

const DateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value: string) {
    return new Date(value);
  },
  serialize(value: Date) {
    return value.toISOString();
  },
});

export default DateScalar;
