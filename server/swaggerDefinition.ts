// swaggerDefinition.js
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Skill Sync Backend APIs',
    version: '1.0.0',
    description: 'A platform for exchanging skills',
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'backend server',
    },
  ],
}

export default swaggerDefinition
