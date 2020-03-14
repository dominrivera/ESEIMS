module.exports = {
    // Users Login
    select_login: `SELECT * FROM users WHERE email = ?`,

    // Users
    select_users: `SELECT * FROM users`,
    select_user: `SELECT * FROM users WHERE id = ?`,
    select_userDNI: `SELECT * FROM users WHERE dni = ?`,
    insert_user: `INSERT INTO users set ?`,
    update_user: `UPDATE users SET name = ?, surname = ?, dni = ?, password = ?, email = ?, role = ? WHERE id = ?`,
    update_user_no_pass: `UPDATE users SET name = ?, surname = ?, dni = ?, email = ?, role = ? WHERE id = ?`,
    delete_user: `DELETE FROM users WHERE id = ?`,

    // Tickets
    select_tickets: `SELECT * FROM tickets`,
    select_ticket: `SELECT * FROM tickets WHERE id = ?`,
    select_ticket_by_creatorId: `SELECT * FROM tickets WHERE creatorId = ?`,
    insert_ticket: `INSERT INTO tickets set ?`,
    update_ticket: `UPDATE tickets SET status = ?, assignment = ?, modified = ? WHERE id = ?`,
    delete_ticket: `DELETE FROM tickets WHERE id = ?`,

    // Comments
    select_comments: `SELECT * FROM comments WHERE ticketId = ? ORDER BY created DESC`,
    insert_comments: `INSERT INTO comments set ?`,
    delete_comments: `DELETE FROM comments WHERE ticketId = ?`
}