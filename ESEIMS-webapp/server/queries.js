module.exports = {
    // Users Login
    select_login: `SELECT * FROM users WHERE email = ?`,

    // Users
    select_users: `SELECT * FROM users`,
    select_user: `SELECT * FROM users WHERE id = ?`,
    insert_user: `INSERT INTO users set ?`,
    update_user: `UPDATE users SET name = ?, surname = ?, dni = ?, password = ?, email = ?, role = ? WHERE id = ?`,
    delete_user: `DELETE FROM users WHERE id = ?`,

    // Tickets
    select_tickets: `SELECT * FROM tickets`,
    select_ticket: `SELECT * FROM tickets WHERE id = ?`,
    insert_ticket: `INSERT INTO tickets set ?`,
    update_ticket: `UPDATE tickets SET comment = ?, status = ?, assignment = ?, creator = ?, modified = ? WHERE id = ?`,
    delete_ticket: `DELETE FROM tickets WHERE id = ?`,

    // Comments
    select_comments: `SELECT * FROM comments WHERE ticket_id = ? ORDER BY created DESC`,
    insert_comments: `INSERT INTO comments set ?`
}