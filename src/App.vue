<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div id="gmount"></div>
</template>

<script setup>
import { onMounted } from "vue";
// import { initGraph } from "./start-demo";
//import { init } from "./custom-node";
//import { init } from "./custom-domnode";
//import { init } from "./custom-jsx";
//import { init } from "./custom-edge";
//import { init } from "./combo";
import { init } from "./custom-combo";
onMounted(() => {
  init();
});
</script>
<style></style>
