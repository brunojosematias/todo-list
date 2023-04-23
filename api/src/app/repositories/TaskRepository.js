const db = require('../../database');

class TasksRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM tasks ORDER by id');

    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);

    return row;
  }

  async findIsChecked() {
    const [row] = await db.query(`
    SELECT COUNT(is_checked)
    FROM tasks
    WHERE is_checked = true`);

    return row;
  }

  async create(content) {
    const [row] = await db.query(`
      INSERT INTO tasks(content)
      VALUES($1)
      RETURNING *
    `, [content]);

    return row;
  }

  async addCheck(is_checked, id) {
    const [row] = await db.query(`
      UPDATE tasks
      SET is_checked = $1
      WHERE id = $2
      RETURNING *
    `, [is_checked, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM tasks WHERE id = $1', [id]);

    return deleteOp;
  }
}

module.exports = new TasksRepository();
