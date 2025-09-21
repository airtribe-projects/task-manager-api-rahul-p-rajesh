const fs = require("fs");
const path = require("path");

const taskFilePath = path.join(__dirname, "../task.json");

const getAllTasks = async (req, res) => {
  try {
    const queryParams = req.query;

    const fileData = await fs.readFileSync(taskFilePath);
    const data = JSON.parse(fileData);
    let tasks = data.tasks;

    if ("completed" in queryParams) {
      const completedValue = queryParams.completed === "true";
      tasks = tasks.filter((task) => task.completed === completedValue);
    }

    return res.status(200).send(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getTaskById = async (req, res) => {
  try {
    const id = Number(req.params.taskId);

    if (!id) {
      return res.status(400);
    }

    const fileData = await fs.readFileSync(taskFilePath);
    const tasks = JSON.parse(fileData).tasks ?? [];

    const task = tasks.find((task) => task.id === id);

    return task ? res.status(200).send(task) : res.status(404).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const getTaskByLevel = async (req, res) => {
  try {
    const level = req.params.level;

    if (!level) {
      return res.status(400);
    }

    const fileData = await fs.readFileSync(taskFilePath);
    const tasks = JSON.parse(fileData).tasks ?? [];

    const task = tasks.find((task) => task.level === level);

    return task ? res.status(200).send(task) : res.status(404).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const addTask = async (req, res) => {
  const body = req.body;

  try {
    if (!body.title || !body.description) {
      return res.status(400).send({
        message: "title is required",
      });
    }

    const fileData = await fs.readFileSync(taskFilePath);
    const tasks = JSON.parse(fileData).tasks ?? [];
    const newTask = {
      id: tasks.length + 1,
      title: body.title,
      description: body.description ? body.description : [],
      completed: false,
    };
    const fileContent = { tasks: [...tasks, newTask] };
    fs.writeFileSync(taskFilePath, JSON.stringify(fileContent, null, 2));

    return res.status(201).send(newTask);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const id = Number(req.params.taskId);
    const body = req.body;

    if (
      !body.title ||
      !body.description ||
      typeof body.completed !== "boolean"
    ) {
      return res.status(400).send({
        message: "complete object is required to update",
      });
    }

    if (!id) {
      return res.status(400).send({
        message: "task id is required",
      });
    }

    const fileData = await fs.readFileSync(taskFilePath);
    const tasks = JSON.parse(fileData).tasks ?? [];
    const task = tasks.find((task) => task.id == id);

    if (!task) {
      return res.status(404).send({
        message: "no task found",
      });
    }

    const updatedTask = {
      id: task.id,
      title: body.title,
      description: body.description,
      completed: body.completed,
    };

    const newTasks = tasks.map((t) => (t.id == id ? updatedTask : t));
    const fileContent = { tasks: newTasks };
    fs.writeFileSync(taskFilePath, JSON.stringify(fileContent, null, 2));

    return res.status(200).send(updatedTask);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const deleteTask = async (req, res) => {
  const id = Number(req.params.taskId);

  if (!id) {
    return res.status(400).send({
      message: "task id is required",
    });
  }

  try {
    const fileData = await fs.readFileSync(taskFilePath);
    const tasks = JSON.parse(fileData).tasks ?? [];
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      return res.status(404).send({
        message: "no task found",
      });
    }

    const newTasks = tasks.filter((task) => {
      return task.id !== id ? true : false;
    });

    const fileContent = { tasks: newTasks };
    fs.writeFileSync(taskFilePath, JSON.stringify(fileContent, null, 2));

    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
  getTaskByLevel,
};
