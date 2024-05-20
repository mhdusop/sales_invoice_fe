<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div class="container">
        <router-link :to="{ name: 'home' }" class="navbar-brand">Home</router-link>
      </div>
    </nav>

    <!--- render router view -->
    <router-view></router-view>

  </div>
</template>

<style>
body{
    background: lightgray;
}
</style>