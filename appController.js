const Task = require('./Models/Task')


exports.save = async (req, res) => {

    const { title, description } = req.body;

    let task = new Task({
        title,
        description
    })

    await task.save();
    res.redirect('/')
};

exports.getTasks = async (req, res) => {
    const tasks = await Task.find();
    res.render('index', { tasks });
}

exports.deleteTask = async (req, res) => {
    const taskId = req.params.taskId;

    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully', task: deletedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};

exports.editTask = async (req, res) => {
    const taskId = req.params.taskId;
    const { title, description } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, { title, description }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
}