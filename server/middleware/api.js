// server/api/games.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import { fromNodeMiddleware } from "h3";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.get("/api/games", async (req, res) => {
  try {
    const endpoint = process.env.API_GAMES_ENDPOINT;
    const response = await fetch(endpoint);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

app.get("/api/detail-games/:gameId", async (req, res) => {
  const { gameId } = req.params;
  try {
    const response = await fetch(
      `${process.env.API_DETAIL_GAMES_ENDPOINT}${gameId}`
    );
    const gameDetails = await response.json();
    res.status(200).json(gameDetails);
  } catch (error) {
    console.error("Error fetching game details:", error);
    res.status(500).json({ error: "Failed to fetch game details" });
  }
});

export default fromNodeMiddleware(app);
