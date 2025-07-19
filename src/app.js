const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const logger = require('./config/logger');
const productRoutes = require('./routes/product.route');
const categoryRoutes = require('./routes/category.route');
const errorHandler = require('./middleware/error.middleware');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined', {
  stream: { write: (message) => logger.info(message.trim()) }
}));

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  next({ status: 404, message: 'Route not found' });
});

app.use(errorHandler);

module.exports = app;