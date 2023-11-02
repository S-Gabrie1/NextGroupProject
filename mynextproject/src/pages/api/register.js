import bcrypt from 'bcrypt';
import { query } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    try {
      const checkUserQuery = "SELECT * FROM users WHERE username = ?";
      const existingUser = await query({ query: checkUserQuery, values: [username] });

      if (existingUser.length > 0) {
        return res.status(400).json({ message: "Username is already in use." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const insertUserQuery = "INSERT INTO users (username, password) VALUES (?, ?)";
      await query({ query: insertUserQuery, values: [username, hashedPassword] });

      res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
      console.error("Error registering user", error);
      res.status(500).json({ message: "An error occurred while registering the user." });
    }
  } 
}