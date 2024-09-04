<script setup>
import GraphEditor from './components/GraphEditor.vue'
import { useStore } from '@/stores/store.js'

const graphStore = useStore()
</script>

<template>
  <main :class="{ dark: graphStore.dark }">
    <GraphEditor />
  </main>
</template>

<style lang="scss">
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';

@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@1.40.1/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@1.40.1/dist/theme-default.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/controls@latest/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/minimap@latest/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/node-resizer@latest/dist/style.css';

html,
body,
#app,
main {
  margin: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

#app {
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  display: block;
  max-width: 100%;
  padding: 0;
}

.vue-flow__minimap {
  transform: scale(75%);
  transform-origin: bottom right;
}

.dnd-flow {
  flex-direction: column;
  display: flex;
  height: 100%;

  .vue-flow-wrapper {
    flex-grow: 1;
    height: 100%;
  }
}

@media screen and (min-width: 640px) {
  .dnd-flow {
    flex-direction: row;

    aside {
      min-width: 25%;
    }
  }
}

@media screen and (max-width: 639px) {
  .dnd-flow aside .nodes {
    display: flex;
    flex-direction: row;
    gap: 5px;
  }
}

.dropzone-background {
  position: relative;
  height: 100%;
  width: 100%;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    pointer-events: none;
  }
}

.basic-flow {
  background: #fff;
  color: #222;
}

.basic-flow .vue-flow__controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.basic-flow.dark .vue-flow__controls {
  border: 1px solid #fffffb;
}

.basic-flow .vue-flow__controls .vue-flow__controls-button {
  border: none;
  border-right: 1px solid #eee;
}

.dark {
  .dnd-flow aside {
    background: #2c2a43;

    .vue-flow__node-input {
      background: #4a5568;
      color: #fffffb;
    }
  }
  .basic-flow {
    background: #2d3748;
    color: #fffffb;

    .vue-flow__node {
      background: #4a5568;
      color: #fffffb;

      &.selected {
        background: #333;
        box-shadow: 0 0 0 2px #2563eb;
      }
    }

    .vue-flow__controls .vue-flow__controls-button {
      background: #333;
      fill: #fffffb;
      border: none;

      &:hover {
        background: #4d4d4d;
      }
    }
  }
}
</style>
