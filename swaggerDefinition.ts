// swaggerDefinition.js
const swaggerDefinition = {
  info: {
    title: 'Skill Sync API',
    version: '1.0.0',
    description: 'A platform for exchanging skills',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server',
    },
  ],
  // ... other configurations
}

export default swaggerDefinition
