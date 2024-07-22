import express from "express";
const app = express();

// Define the port (default is 3000)
const PORT = process.env.PORT || 3000;

// Example route (replace with your routes)
app.get("/", (req, res) => {
  res.send("Hello from Express server!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
