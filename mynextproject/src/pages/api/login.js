import { query } from "../../lib/db";
import bcrypt from "bcrypt";
import Cookies from "js-cookie"

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    try {
      // Check if the username exists in the database
      const checkUserQuery = "SELECT * FROM users WHERE username = ?";
      const existingUser = await query({
        query: checkUserQuery,
        values: [username],
      });

      if (existingUser.length === 0) {
        return res.status(400).json({ message: "Username not found." });
      }

      // Compare the provided password with the hashed password from the database
      const storedPassword = existingUser[0].password;
      const passwordMatch = await bcrypt.compare(password, storedPassword);

      if (!passwordMatch) {
        return res.status(400).json({ message: "Incorrect password." });
      }
      const userId = existingUser[0].id;
      res.status(200).json({ message: "Logged in successfully", id: userId });
      Cookies.set('user_authenticated', 'true');
    } catch (error) {
      console.error("Error during login", error);
      res.status(500).json({ message: "An error occurred during login." });
    }
  }
}
