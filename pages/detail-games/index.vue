<template>
  <div class="container mx-auto p-8">
    <div class="flex flex-col md:flex-row">
      <div class="w-full md:w-1/3 flex flex-col space-y-2">
        <div class="flex flex-col space-y-2 bg-white p-4 rounded-md shadow-md">
          <img
            :src="game.thumbnail"
            alt="Game Thumbnail"
            class="w-full h-auto object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105" />

          <div class="flex flex-row justify-between items-center">
            <div class="text-2xl font-bold">{{ game.title }}</div>
            <a
              :href="game.game_url"
              target="_blank"
              class="inline-block text-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Play Now
            </a>
          </div>
        </div>

        <div
          class="flex flex-col space-y-1.5 p-4 bg-white rounded-md shadow-md">
          <div class="font-semibold text-xl">Screenshots:</div>
          <div class="flex flex-wrap justify-center mt-4">
            <img
              v-for="screenshot in gameDetails ? gameDetails.screenshots : []"
              :key="screenshot.id"
              :src="screenshot.image"
              alt="Game Screenshot"
              @click="openModal(screenshot.image)"
              class="w-full h-auto object-cover rounded-lg m-1 shadow-md cursor-pointer transition-transform transform hover:scale-105" />
          </div>
        </div>
      </div>

      <div class="flex-1 bg-white rounded-lg shadow-lg p-6 ml-6 md:mt-0 mt-4">
        <div class="text-4xl font-bold text-gray-800 mt-6 mb-4">
          Game Details
        </div>
        <div
          v-html="sanitizedDescription"
          class="mb-6 text-gray-600 text-base"></div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <div class="font-semibold text-lg">Genres:</div>
            <div class="text-gray-700">
              {{ gameDetails ? gameDetails.genre : "N/A" }}
            </div>
          </div>
          <div>
            <div class="font-semibold text-lg">Platforms:</div>
            <div class="text-gray-700">
              {{ gameDetails ? gameDetails.platform : "N/A" }}
            </div>
          </div>
          <div>
            <div class="font-semibold text-lg">Publisher:</div>
            <div class="text-gray-700">
              {{ gameDetails ? gameDetails.publisher : "N/A" }}
            </div>
          </div>
          <div>
            <div class="font-semibold text-lg">Developer:</div>
            <div class="text-gray-700">
              {{ gameDetails ? gameDetails.developer : "N/A" }}
            </div>
          </div>
          <div>
            <div class="font-semibold text-lg">Release Date:</div>
            <div class="text-gray-700">
              {{ gameDetails ? gameDetails.release_date : "N/A" }}
            </div>
          </div>
        </div>

        <div class="font-semibold text-xl mt-6">
          Minimum System Requirements:
        </div>
        <div class="list-disc ml-5 text-gray-700 mb-4">
          <li>
            OS:
            {{
              gameDetails ? gameDetails.minimum_system_requirements.os : "N/A"
            }}
          </li>
          <li>
            Processor:
            {{
              gameDetails
                ? gameDetails.minimum_system_requirements.processor
                : "N/A"
            }}
          </li>
          <li>
            Memory:
            {{
              gameDetails
                ? gameDetails.minimum_system_requirements.memory
                : "N/A"
            }}
          </li>
          <li>
            Graphics:
            {{
              gameDetails
                ? gameDetails.minimum_system_requirements.graphics
                : "N/A"
            }}
          </li>
          <li>
            Storage:
            {{
              gameDetails
                ? gameDetails.minimum_system_requirements.storage
                : "N/A"
            }}
          </li>
        </div>
      </div>
    </div>

    <div
      v-if="showModal"
      @click="closeModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div class="relative p-4 rounded-lg shadow-lg">
        <img
          :src="modalImage"
          alt="Screenshot"
          class="w-full h-auto rounded-lg p-24" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useGameStore } from "@/stores/index";
import DOMPurify from "dompurify";

const route = useRoute();
const gameId = route.query.id;
const game = ref({});
const gameDetails = ref(null);
const sanitizedDescription = ref("");

const showModal = ref(false);
const modalImage = ref("");

const openModal = (imageUrl) => {
  modalImage.value = imageUrl;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const gameStore = useGameStore();

onMounted(async () => {
  if (!gameId) return;

  if (gameId.startsWith("temp")) {
    const tempGame = gameStore.games.find((g) => g.id === gameId);
    if (tempGame) {
      game.value = tempGame;
      gameDetails.value = tempGame;
      sanitizedDescription.value = DOMPurify.sanitize(tempGame.description);
    } else {
      console.error("Game with temporary ID not found in store.");
    }
  } else {
    try {
      const response = await fetch(`/api/detail-games/${gameId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const gameData = await response.json();
      game.value = gameData;
      gameDetails.value = gameData;
      sanitizedDescription.value = DOMPurify.sanitize(gameData.description);
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  }
});
</script>

