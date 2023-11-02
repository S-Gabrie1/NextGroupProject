import { query } from "../../../lib/db";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { visibility, favourite, isDeleted } = req.body;
    const currentDate = new Date();

    try {
      const editDoc = await query({
        query:
          "UPDATE content SET  visibility = ?, favourite = ?, isDeleted = ? WHERE id = ?",
        values: [ visibility, favourite, isDeleted, id],
      });

      res.status(200).json({ editDoc });
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ message: "Error querying from the database", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}