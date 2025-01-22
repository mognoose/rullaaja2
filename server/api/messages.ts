export default defineEventHandler(async event => {

    const db = useDatabase();

    const messages = await db.sql`SELECT * FROM messages`;

    return messages;
})