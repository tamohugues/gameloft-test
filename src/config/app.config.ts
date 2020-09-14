export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  requestTimeout: 1000 * 60 * 5,
  graphql: {
    autoSchemaFilePath: process.env.GRAPHQL_AUTO_SCHEMA_FILE_PATH || 'src/schema.gql',
  }
});
