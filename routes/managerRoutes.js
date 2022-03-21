const express = require("express");
const empModel = require("../models/employee");
const app = express();

app.get("/employees", async (request, response) => {
    const employees = await empModel.find({});
    try {
        response.send(employees);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/employee", async (request, response) => {
    const employee = new empModel(request.body);

    try {
        await employee.save();
        response.send(employee);
    } catch (error) {
        response.status(500).send(error);
    }
})

app.patch("/employee/:id", async (request, response) => {
    try {
        await empModel.findByIdAndUpdate(request.params.id, request.body);
        await foodModel.save();
        response.send(food);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.delete("/employee/:id", async (request, response) => {
    try {
        const employee = await empModel.findByIdAndDelete(request.params.id);

        if (!employee) response.status(404).send("No employee found");
        response.status(200).send();
    } catch (error) {
        response.status(500).send(error);
    }
})

module.exports = app;