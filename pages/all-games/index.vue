<template>
  <div class="p-8">
    <div class="text-3xl font-bold text-center mb-6">PC Games List</div>
    <div class="flex justify-center mb-6">
      <div class="bg-white w-full rounded-md p-2">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search games..."
          class="p-2 rounded-md w-full focus:outline-none" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink
        v-for="game in filteredGames"
        :key="game.id"
        :to="`/detail-games?id=${game.id}`"
        class="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center hover:scale-105">
        <img
          :src="game.thumbnail"
          alt="Game Thumbnail"
          class="w-full h-auto object-cover rounded-md mb-4" />
        <div class="text-xl font-semibold">{{ game.title }}</div>
        <div class="text-gray-600 text-sm mt-2">{{ game.short_description }}</div>
      </NuxtLink>
    </div>

    <div class="flex justify-center mt-6">
      <button
        v-if="currentPage > 1"
        @click="prevPage"
        class="bg-blue-500 text-white px-4 py-2 rounded-l hover:bg-blue-600 transition">
        Back
      </button>

      <div class="px-4 py-2">
        Page {{ currentPage }} of {{ totalPages }}
      </div>

      <button
        v-if="currentPage < totalPages"
        @click="nextPage"
        class="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition">
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useGameStore } from "@/stores/index";
import { storeToRefs } from "pinia";

const gameStore = useGameStore();
const { games, loading, error } = storeToRefs(gameStore);

const itemsPerPage = 21;
const currentPage = ref(1);
const searchQuery = ref("");

onMounted(async () => {
  if (!games.value || games.value.length === 0) {
    await gameStore.fetchGames();
  }
});
const filteredGames = computed(() => {
  const searchLower = searchQuery.value.toLowerCase();
  const filtered = games.value.filter((game) =>
    game.title.toLowerCase().includes(searchLower)
  );

  const start = (currentPage.value - 1) * itemsPerPage;
  return filtered.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => {
  const searchLower = searchQuery.value.toLowerCase();
  const filtered = games.value.filter((game) =>
    game.title.toLowerCase().includes(searchLower)
  );
  return Math.ceil(filtered.length / itemsPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    window.scrollTo(0, 0);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    window.scrollTo(0, 0);
  }
};
</script>
