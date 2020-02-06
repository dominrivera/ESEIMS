module.exports = {
    select_users: `SELECT * FROM users`,
    select_user: `SELECT * FROM users WHERE user.id = ?`,
    insert_user: `INSERT INTO users(id, name, surname, dni, username, password, email, role) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
    update_user: `UPDATE users SET user.name = ?, user.surname = ?, user.dni = ?, user.username = ?, user.password = ?, user.email = ?, user.role = ? WHERE user.id = ?`,
    delete_user: `DELETE FROM users WHERE user.id = ?`,

    select_tickets: `SELECT * FROM tickets`,
    select_ticket: `SELECT * FROM tickets WHERE ticket.id = ?`,
    insert_ticket: `INSERT INTO tickets(id, short_description, description, status, assignment, created, modified) VALUES(?, ?, ?, ?, ?, ?, ?)`,
    update_ticket: `UPDATE tickets SET ticket.short_description = ?, ticket.description = ?, ticket.status = ?, ticket.assignment = ?, ticket.created = ?, ticket.modified = ? WHERE ticket.id = ?`,
    delete_ticket: `DELETE FROM tickets WHERE ticket.id = ?`
}