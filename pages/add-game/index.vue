<template>
  <div class="container mx-auto p-8">
    <div class="text-4xl font-bold mb-6 text-center">Add Game</div>
    <form
      @submit.prevent="handleSubmit"
      class="bg-white shadow-lg rounded-lg p-6 space-y-6">
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Title</label>
        <input
          v-model="game.title"
          required
          type="text"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-semibold"
          >Short Description</label
        >
        <textarea
          v-model="game.short_description"
          required
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          rows="2"></textarea>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Description</label>
        <textarea
          v-model="game.description"
          required
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          rows="4"></textarea>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-semibold mb-2">Thumbnail</label>
        <div class="flex items-center space-x-4">
          <input
            type="file"
            @change="handleThumbnailChange"
            class="hidden"
            ref="thumbnailInput" />
          <button
            type="button"
            @click="uploadThumbnail"
            class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 shadow-md">
            Upload Thumbnail
          </button>
          <div
            v-if="thumbnailPreview"
            class="mt-2">
            <img
              :src="thumbnailPreview"
              alt="Thumbnail Preview"
              class="w-32 h-auto rounded-lg border border-gray-300 shadow" />
          </div>
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Genre</label>
        <input
          v-model="game.genre"
          required
          type="text"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Platform</label>
        <input
          v-model="game.platform"
          required
          type="text"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Publisher</label>
        <input
          v-model="game.publisher"
          required
          type="text"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Developer</label>
        <input
          v-model="game.developer"
          required
          type="text"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Release Date</label>
        <input
          v-model="game.release_date"
          required
          type="date"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
      </div>

      <div class="mb-4">
        <div class="text-lg font-semibold">Minimum System Requirements</div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-700">OS</label>
            <input
              v-model="game.minimum_system_requirements.os"
              required
              type="text"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
          </div>
          <div>
            <label class="block text-gray-700">Processor</label>
            <input
              v-model="game.minimum_system_requirements.processor"
              required
              type="text"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
          </div>
          <div>
            <label class="block text-gray-700">Memory</label>
            <input
              v-model="game.minimum_system_requirements.memory"
              required
              type="text"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
          </div>
          <div>
            <label class="block text-gray-700">Graphics</label>
            <input
              v-model="game.minimum_system_requirements.graphics"
              required
              type="text"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
          </div>
          <div>
            <label class="block text-gray-700">Storage</label>
            <input
              v-model="game.minimum_system_requirements.storage"
              required
              type="text"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
          </div>
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-semibold mb-2"
          >Screenshots</label
        >
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="(preview, index) in screenshotPreviews"
            :key="index"
            class="relative group">
            <img
              :src="preview"
              alt="Screenshot Preview"
              class="w-full h-auto rounded-lg border border-gray-300 shadow" />
            <button
              type="button"
              @click="removeScreenshot(index)"
              class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition duration-200 shadow">
              &times;
            </button>
          </div>

          <input
            type="file"
            multiple
            @change="handleScreenshotChange"
            class="hidden"
            ref="screenshotInput" />
          <button
            type="button"
            @click="uploadScreenshots"
            class="flex items-center justify-center w-44 h-full p-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition duration-200">
            <span class="text-gray-500">&plus; Add Screenshot</span>
          </button>
        </div>
      </div>

      <button
        type="submit"
        class="mt-4 w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 shadow-md">
        Add
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useGameStore } from "@/stores/index";
import { storeToRefs } from "pinia";

const game = ref({
  title: "",
  short_description: "",
  description: "",
  thumbnail: null,
  genre: "",
  platform: "",
  publisher: "",
  developer: "",
  release_date: "",
  minimum_system_requirements: {
    os: "",
    processor: "",
    memory: "",
    graphics: "",
    storage: "",
  },
  screenshots: [],
});

const thumbnailPreview = ref(null);
const screenshotPreviews = ref([]);
const thumbnailInput = ref(null);
const screenshotInput = ref(null);

const gameStore = useGameStore();
const { games } = storeToRefs(gameStore);

const uploadThumbnail = ()=> {
  thumbnailInput.value.click();
}

const uploadScreenshots =()=> {
  screenshotInput.value.click();
}

const handleThumbnailChange =(event)=> {
  const file = event.target.files[0];
  game.value.thumbnail = file;

  const reader = new FileReader();
  reader.onload = (e) => {
    thumbnailPreview.value = e.target.result;
    game.value.thumbnail = e.target.result;
  };
  reader.readAsDataURL(file);
}

const handleScreenshotChange = (event) => {
  const files = Array.from(event.target.files);

  files.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const screenshotData = {
        id: `screenshot${game.value.screenshots.length + 1}`,
        image: e.target.result,
      };
      game.value.screenshots.push(screenshotData);
      screenshotPreviews.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });
}

const removeScreenshot = (index) =>{
  game.value.screenshots.splice(index, 1);
  screenshotPreviews.value.splice(index, 1);
}

const handleSubmit = () => {
  const tempId = `temp${games.value.length + 1}`;

  const newGame = {
    id: tempId,
    ...game.value,
  };

  gameStore.addGame(newGame);

  resetForm();
}

const resetForm = () => {
  game.value = {
    title: "",
    short_description: "",
    description: "",
    thumbnail: null,
    genre: "",
    platform: "",
    publisher: "",
    developer: "",
    release_date: "",
    minimum_system_requirements: {
      os: "",
      processor: "",
      memory: "",
      graphics: "",
      storage: "",
    },
    screenshots: [],
  };
  thumbnailPreview.value = null;
  screenshotPreviews.value = [];
}
</script>
