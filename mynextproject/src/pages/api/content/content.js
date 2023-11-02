import { query } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId parameter" });
    }

    try {
      const content = await query({
        query: "SELECT * FROM content WHERE userId = ?",
        values: [userId],
      });

      res.status(200).json({ content });
    } catch (error) {
      console.error("Error querying the database", error);
      res.status(500).json({ message: "Error querying the database", error });
    }
  }

  if (req.method === "POST") {
    const { text_field, date, userId , visibility,  favourite, isDeleted, text } = req.body;
  
    try {
      const insertQuery = `
        INSERT INTO content (text_field, date, userId, visibility, favourite, isDeleted, text)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
  
      const result = await query({
        query: insertQuery,
        values: [text_field, date, userId, visibility, favourite, isDeleted, text],
      });
  
      res.status(200).json({ result });
    } catch (error) {
      console.error("Error inserting content into the database", error);
      res.status(500).json({ message: "Error inserting content into the database", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }

  if (req.method === "PUT") {
    const { id, text_field, visibility, favourite, isDeleted, text } = req.body;
    const currentDate = new Date();
  
    try {
      const editDoc = await query({
        query:
          "UPDATE content SET text_field = ?, date = ?, visibility = ?, favourite = ?, isDeleted = ?, text = ? WHERE id = ?",
        values: [
          text_field,
          currentDate, 
          visibility,
          favourite,
          isDeleted,
          text,
          id,
        ],
      });
  
      res.status(200).json({ editDoc });
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ message: "Error querying from the database", error });
    }
  }
}