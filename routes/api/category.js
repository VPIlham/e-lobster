const route = require("express").Router();
const CategoryController = require("../../controllers/api/CategoryController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Categories:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        id:
 *          type: number
 *          description: The id must be a number
 *        name:
 *          type: string
 *          description: The name category
 *      example:
 *        name: Lobster Air Tawar
 */

/**
 * @swagger
 * tags:
 *  name: Categories
 *  description: The Categories managing API
 */

/**
 * @swagger
 * /api/categories:
 *  get:
 *    summary: Retrieve a list of Categories.
 *    tags: [Categories]
 *    responses:
 *      200:
 *        description: The list of Categories
 *        content:
 *        application/json:
 *          schema:
 *            type: array
 *
 *
 *
 */

route.get("/", CategoryController.index);

/**
 * @swagger
 * /api/categories/create:
 *  post:
 *    summary: Create a Categories.
 *    tags: [Categories]
 *    requestBody:
 *      required:
 *        - name
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Categories'
 *    responses:
 *      200:
 *        description: The Categories has been added
 *        content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/Categories'
 *      404:
 *        description: Server error
 *
 */

route.post("/create", CategoryController.add);

/**
 * @swagger
 * /api/categories/{id}:
 *  post:
 *    summary: Update a Categories.
 *    tags: [Categories]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Update Categories id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Categories'
 *    responses:
 *      200:
 *        description: Categories with id {id} has been updated
 *        content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/Categories'
 *      404:
 *        description: Server error
 *
 */

route.post("/update/:id", CategoryController.update);
/**
 * @swagger
 * /api/categories/delete/{id}:
 *  get:
 *    summary: Delete a Categories.
 *    tags: [Categories]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Categories id
 *    responses:
 *      200:
 *        description: Categories with id {id} has been deleted
 *      404:
 *        description: Server error
 *
 */
route.get("/delete/:id", CategoryController.destroy);

module.exports = route;
