<script setup>
import { ref, onMounted } from 'vue'
import { useGraphStore } from '../stores/graph'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { ControlButton, Controls } from '@vue-flow/controls'
import NodeMenu from './NodeMenu.vue'
import NodeModal from './NodeModal.vue'
import DropzoneBackground from './DropzoneBackground.vue'
import Icon from './icons/IconSprite.vue'
import useDragAndDrop from '../composables/useDnD'

const graphStore = useGraphStore()

const { onConnect, addEdges } = useVueFlow()
const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

const selectedNode = ref(null)
const nodes = ref([])

onConnect(addEdges)

const addNode = (node) => {
  graphStore.addElement(node)
}

const onNodeDragStart = (event) => {
  console.log('Node drag started:', event)
}

const onNodeDragStop = (event) => {
  console.log('Node drag stopped:', event)
}

const onConnectGraph = (params) => {
  graphStore.addElement({
    id: `edge-${params.source}-${params.target}`,
    source: params.source,
    target: params.target
  })
}

const updateNode = (node) => {
  graphStore.updateElement(node)
  selectedNode.value = null
}

function toggleDarkMode() {
  graphStore.dark = !graphStore.dark
}

onMounted(() => {
  graphStore.loadGraph()
})
</script>

<template>
  <div class="dnd-flow" @drop="onDrop">
    <NodeMenu />
    <VueFlow
      :class="{ dark: graphStore.dark }"
      class="basic-flow"
      :nodes="nodes"
      @dragover="onDragOver"
      @dragleave="onDragLeave">
      <DropzoneBackground
        :style="{
          backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
          transition: 'background-color 0.2s ease'
        }">
        <p v-if="isDragOver">Drop here</p>
      </DropzoneBackground>
      <Controls position="top-left">
        <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
          <Icon v-if="graphStore.dark" name="sun" />
          <Icon v-else name="moon" />
        </ControlButton>
      </Controls>
    </VueFlow>

    <NodeModal v-if="selectedNode" :node="selectedNode" @save="updateNode" />
  </div>
</template>

<style></style>
