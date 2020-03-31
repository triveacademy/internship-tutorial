'use strict'

module.exports = async function (decoded, request, h) {
    const findSessionID = await request.pgsql.query(
        `SELECT * FROM "session" JOIN "staff" ON staff.staff_id = session.staff_id WHERE "session_id" = $1 LIMIT 1`,
        [decoded.session_id]
    )
    if (findSessionID.rowCount == 0) {
        return { isValid: false };
    }

    return { isValid: true, credentials: { scope: findSessionID.rows[0].user_type, username: findSessionID.rows[0].username } };
};