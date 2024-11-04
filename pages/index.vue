<template>
  <div class="min-h-screen bg-gray-100">
    <section
      class="relative bg-cover bg-center py-72 transition-opacity duration-700 ease-in-out"
      :style="{
        backgroundImage: backgrounds.length
          ? `url(${backgrounds[currentBackgroundIndex]})`
          : 'none',
        backgroundColor: backgrounds.length ? 'transparent' : 'white',
      }">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="container mx-auto relative z-10 text-white text-center">
        <div class="text-5xl font-extrabold mb-4">Discover Epic PC Games</div>
        <div class="text-lg mb-6">
          Explore a world of adventure and excitement. Join millions of players
          today!
        </div>
      </div>
    </section>

    <section
      id="games"
      class="py-20">
      <div class="container mx-auto text-center">
        <div class="text-4xl font-bold mb-10">Featured Games</div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink
            v-for="game in featuredGames"
            :to="`/detail-games?id=${game.id}`"
            :key="game.id"
            class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <img
              :src="game.thumbnail"
              :alt="game.title"
              class="w-full h-auto object-cover" />
            <div class="p-4">
              <h3 class="text-xl font-semibold">{{ game.title }}</h3>
              <p class="text-gray-600 mt-2">{{ game.short_description }}</p>
            </div>
          </NuxtLink>
        </div>

        <div class="text-3xl font-bold mt-10 mb-4">More Games</div>
        <div class="flex overflow-x-auto space-x-4">
          <NuxtLink
            v-for="(game, index) in moreGames"
            :key="index"
            :to="`/detail-games?id=${game.id}`"
            class="flex-none w-40 bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow duration-300">
            <img
              :src="game.thumbnail"
              :alt="game.title"
              class="w-full h-24 object-cover rounded-md mb-2" />
            <div class="text-md font-semibold">{{ game.title }}</div>
          </NuxtLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useGameStore } from "@/stores/index";
import { storeToRefs } from "pinia";

const gameStore = useGameStore();
const { games, loading, error } = storeToRefs(gameStore);

const backgrounds = ref([]);
const currentBackgroundIndex = ref(0);

const featuredGames = computed(() => {
  return games.value.slice(0, 3);
});

const moreGames = computed(() => {
  return games.value.slice(0, 10);
});

onMounted(async () => {
  if (!games.value || games.value.length === 0) {
    await gameStore.fetchGames();
    console.log("tes", games.value);
  }
  backgrounds.value = games.value.map((game) => game.thumbnail);
  setInterval(() => {
    if (backgrounds.value.length) {
      currentBackgroundIndex.value =
        (currentBackgroundIndex.value + 1) % backgrounds.value.length;
    }
  }, 5000);
});
</script>

