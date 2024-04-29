const express = require("express");
const { auth } = require("../middleware/auth");
const { access } = require("../middleware/access");
const { addTask, getTask, updateTask, deleteTask } = require("../mod/routes.mod");
const taskRoutes = express.Router();

/**
 * @openapi
 * /task/add:
 *   post:
 *     description: You can create document from here!
 *     tags:
 *       - Add tasks
 *     parameters:
 *       - name: title
 *         in: formData
 *         required: true
 *         description: task's title
 *         schema:
 *           type: string
 *       - name: desc
 *         in: formData
 *         required: true
 *         description: task's description
 *         schema:
 *           type: string
 *       - name: status
 *         in: formData
 *         required: true
 *         description: tasks's status
 *         schema:
 *           type: string
 *       - name: priority
 *         in: formData
 *         required: true
 *         description: tasks's priority
 *         schema:
 *           type: string
 *     response:
 *       200:
 *         description: Return success message  indicating that Docuument has been created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

taskRoutes.post("/add", auth, access("Member"), addTask)

/**
 * @openapi
 * task/:
 *   get:
 *     description: recieve all the documents!
 *     tags:
 *       - Retrive tasks
 *     response:
 *       200:
 *         description: Returns all the documents .
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: the id of the task
 *                 title:
 *                   type: string
 *                   description: title of the task
 *                 desc:
 *                   type: string
 *                   description: description of the task
 *                 status:
 *                   type: string
 *                   description: status of the task
 *                 priority:
 *                   type: string
 *                   description: priority of the task
 *       404:
 *         description: Fail to retrive the documents
 */


taskRoutes.get("/", auth, access("Member", "Manager", "Admin"), getTask)

/**
 * @openapi
 * /task/add:
 *   patch:
 *     description: You can update document from here!
 *     tags:
 *       - Update tasks
 *     parameters:
 *       - name: _id
 *         in: formData
 *         required: true
 *         description: task's id
 *         schema:
 *           type: string
 *       - name: title
 *         in: formData
 *         required: true
 *         description: task's title
 *         schema:
 *           type: string
 *       - name: desc
 *         in: formData
 *         required: true
 *         description: task's description
 *         schema:
 *           type: string
 *       - name: status
 *         in: formData
 *         required: true
 *         description: tasks's status
 *         schema:
 *           type: string
 *       - name: priority
 *         in: formData
 *         required: true
 *         description: tasks's priority
 *         schema:
 *           type: string
 *     response:
 *       200:
 *         description: Return success message  indicating that Docuument has been created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */


taskRoutes.patch("/:id", auth, access("Member"), updateTask)

/**
 * @openapi
 * /task/id:
 *   delete:
 *     description: You can delete document by its task id!
 *     tags:
 *       - Delete tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: task's id
 *         schema:
 *           type: string
 *     response:
 *       200:
 *         description: Return success message  indicating that Docuument has been deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */


taskRoutes.delete("/:id", auth, access("Member"), deleteTask)


module.exports = {
    taskRoutes
}