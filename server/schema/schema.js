const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
} = graphql;
const _ = require('lodash');
const { words } = require('./mockdata');


// models
const WordType = new GraphQLObjectType({
  name: 'Word',
  fields: () => ({
    id: { type: GraphQLID },
    word: { type: GraphQLString },
  })
});

// the real query from user (interface)
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    word: {
      type: WordType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(words, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
