import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameStore = defineStore("game", () => {
  const games = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchGames = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch("/api/games");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      games.value = data;
    } catch (err) {
      error.value = err.message;
      console.error("Error fetching games:", err);
    } finally {
      loading.value = false;
    }
  };

  const addGame = (newGame) => {
    games.value.push(newGame);
  };

  return { games, loading, error, fetchGames, addGame };
});
