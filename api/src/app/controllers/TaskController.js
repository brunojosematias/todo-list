const TaskRepository = require('../repositories/TaskRepository');

class TaskController {
  async index(request, response) {
    const tasks = await TaskRepository.findAll();

    response.json(tasks);
  }

  async indexChecked(request, response) {
    const countTask = await TaskRepository.findIsChecked();

    response.json(countTask);
  }

  async store(request, response) {
    const { content } = request.body;

    const task = await TaskRepository.create(content);

    response.json(task);
  }

  async storeCheck(request, response) {
    const { id } = request.params;
    const { is_checked } = request.body;

    const idExists = await TaskRepository.findById(id);
    if (!idExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    const isChecked = await TaskRepository.addCheck(is_checked, id);

    response.json(isChecked);
  }

  async delete(request, response) {
    const { id } = request.params;

    await TaskRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new TaskController();
