const express = require("express");
const empModel = require("../models/employee");
const app = express();
app.use(express.urlencoded({ extended: true }));

// return all employees
app.get("/employees", async (request, response) => {
  const employees = await empModel.find({});
  try {
    response.send(employees);
  } catch (error) {
    response.status(500).send(error);
  }
});

// create employee
app.post("/employee", async (request, response) => {
  const employee = new empModel(request.body);

  try {
    await employee.save();
    response.send(employee);
  } catch (error) {
    response.status(500).send(error);
  }
});

// update employee
app.patch("/employee/:id", async (request, response) => {
  try {
    const employee = await empModel.findByIdAndUpdate(
      request.params.id,
      request.body
    );
    response.send(employee);
  } catch (error) {
    response.status(500).send(error);
  }
});

// delete employee
app.delete("/employee/:id", async (request, response) => {
  try {
    const employee = await empModel.findByIdAndDelete(request.params.id);

    if (!employee) response.status(404).send("No employee found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

//===== additional routes
app.post("/findEmployee", async (request, response) => {
  const employee = await empModel.findById(request.body.id);
  try {
    response.send(employee);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/updateEmployee", async (request, response) => {
  await empModel.findByIdAndUpdate(request.body.id, request.body);
  let employee = await empModel.findById(request.body.id); // so that it returns updated value in DB
  try {
    response.send(employee);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/deleteEmployee", async (request, response) => {
  try {
    const employee = await empModel.findByIdAndDelete(request.body.id);
    if (!employee) response.status(404).send("No employee found");

    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});
// app.get("/all_employees", async (request, response) => {
//     // const employees = await empModel.find({});
//     // try {
//     //     res.render('all_employees.ejs', {
//     //         employeeList: employees
//     //     });
//     // } catch (error) {
//     //     response.status(500).send(error);
//     // }
//     empModel.find({}, function(employeeList) {
//         res.render('all_employees.ejs', {
//             employeeList: employee
//         })
//     })
// })
module.exports = app;
