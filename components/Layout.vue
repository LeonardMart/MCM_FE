<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-gray-800 text-white shadow-md">
      <div
        class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="text-2xl font-bold">
          <NuxtLink to="/">Immortal Games</NuxtLink>
        </div>

        <nav class="space-x-4">
          <NuxtLink
            to="/"
            class="hover:text-blue-300"
            >Home</NuxtLink
          >
          <NuxtLink
            to="/all-games"
            class="hover:text-blue-300"
            >All Games</NuxtLink
          >
          <NuxtLink
            to="/add-game"
            class="hover:text-blue-300"
            >Add Games</NuxtLink
          >
        </nav>
      </div>
    </header>

    <main class="flex-grow bg-gray-200">
      <slot></slot>
    </main>

    <footer class="bg-gray-800 text-white py-4">
      <div class="container mx-auto text-center">
        <div class="font-bold text-lg">&copy; Leonard Ryo Martadi</div>
      </div>
    </footer>
  </div>
</template>
