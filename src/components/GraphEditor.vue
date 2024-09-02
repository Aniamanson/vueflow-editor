<script setup>
import { ref, onMounted, watch } from 'vue'
import { useStore } from '../stores/store'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { ControlButton, Controls } from '@vue-flow/controls'
import NodeMenu from './NodeMenu.vue'
import NodeModal from './NodeModal.vue'
import DropzoneBackground from './DropzoneBackground.vue'
import Icon from './icons/IconSprite.vue'
import useDragAndDrop from '../composables/useDnD'

const graphStore = useStore()

const { onConnect, addEdges } = useVueFlow()
const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

const { onPaneReady } = useVueFlow()
onPaneReady((instance) => instance.fitView())

const selectedNode = ref(null)
const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep'
}

onConnect(addEdges)

function toggleDarkMode() {
  graphStore.toggleClass()
}

watch(
  graphStore,
  () => {
    graphStore.saveGraph()
  },
  { deep: true }
)

onMounted(() => {
  graphStore.loadGraph()
  graphStore.loadTheme()
})
</script>

<template>
  <div class="dnd-flow" @drop="onDrop">
    <NodeMenu />
    <VueFlow
      :class="{ dark: graphStore.dark }"
      class="basic-flow"
      v-model:nodes="graphStore.nodes"
      v-model:edges="graphStore.edges"
      :defaultEdgeOptions="defaultEdgeOptions"
      @dragover="onDragOver"
      @dragleave="onDragLeave">
      <DropzoneBackground>
        <p v-if="isDragOver">Drop here</p>
      </DropzoneBackground>
      <Controls position="top-left">
        <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
          <Icon v-if="graphStore.dark" name="sun" />
          <Icon v-else name="moon" />
        </ControlButton>
      </Controls>
    </VueFlow>

    <NodeModal v-if="selectedNode" :node="selectedNode" />
  </div>
</template>

<style></style>
