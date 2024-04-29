const express = require('express');
const { dbconnect } = require('./config/config');
const { userRouter } = require('./routes/user.routes');
const { taskRoutes } = require('./routes/task.routes');
const cors = require("cors")
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express")
const app = express();

app.use(express.json());
app.use(cors());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Manager Application',
            version: '1.0.0',
        },
    },
    urls: [
        {
          url: 'http://petstore.swagger.io/v2/swagger.json',
          name: 'Spec1'
        }
    ],
    apis: ['./routes/*.js'], // files containing annotations as above
};
const openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use("/user", userRouter);
app.use("/task", taskRoutes)
app.listen(8000, async (req, res) => {
    try {
        await dbconnect;
        console.log("Server is running on port 8000");
    } catch (error) {
        console.log(error);
    }

})