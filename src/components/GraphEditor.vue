<script setup>
import { ref, onMounted, watch } from 'vue'
import { useStore } from '../stores/store'
import { VueFlow, useVueFlow, MarkerType } from '@vue-flow/core'
import { ControlButton, Controls } from '@vue-flow/controls'
import NodeMenu from './NodeMenu.vue'
import NodeModal from './modals/NodeModal.vue'
import DropzoneBackground from './DropzoneBackground.vue'
import CustomNode from './CustomNode.vue'
import Icon from './icons/IconSprite.vue'
import useDragAndDrop from '../composables/useDnD'
import { useModal } from '../composables/useModals.js'

const graphStore = useStore()
const modal = useModal()

const { onConnect, addEdges, onNodeDoubleClick, setViewport } = useVueFlow()
const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

const { onPaneReady } = useVueFlow()

const selectedNode = ref(null)
const selectedNodeType = ref(null)

const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep',
  markerEnd: MarkerType.ArrowClosed
}

onConnect(addEdges)

const toggleDarkMode = () => {
  graphStore.toggleClass()
}

const handleNodeDoubleClick = (node) => {
  selectedNode.value = node

  if (selectedNodeType.value === node.type) {
    modal.modalOpen.value = !modal.modalOpen.value
  } else {
    selectedNodeType.value = node.type

    modal.modalOpen.value = node.type !== 'default'
  }
}

const saveViewport = (viewport) => {
  localStorage.setItem('dropzonePosition', JSON.stringify(viewport))
}

const loadViewport = () => {
  const savedPosition = localStorage.getItem('dropzonePosition')
  return savedPosition ? JSON.parse(savedPosition) : { x: 0, y: 0, zoom: 1.5 }
}

onPaneReady(() => {
  // Set up the nodeDoubleClick event listener
  onNodeDoubleClick(({ node }) => {
    handleNodeDoubleClick(node)
  })
})

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

  // Load the saved viewport if available
  const savedViewport = loadViewport()
  if (savedViewport) {
    setViewport(savedViewport)
  }
})
</script>

<template>
  <div class="dnd-flow" @drop="onDrop">
    <NodeMenu />
    <VueFlow
      class="basic-flow"
      v-model:nodes="graphStore.nodes"
      v-model:edges="graphStore.edges"
      :defaultEdgeOptions="defaultEdgeOptions"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @viewport-change="saveViewport">
      <template #node-custom="props">
        <CustomNode v-bind="props" />
      </template>

      <DropzoneBackground>
        <p v-if="isDragOver">Drop here</p>
      </DropzoneBackground>

      <Controls position="top-left">
        <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
          <Icon v-if="graphStore.dark" name="sun" />
          <Icon v-else name="moon" />
        </ControlButton>
        <ControlButton title="Save JSON" @click="graphStore.saveJsonGraph(true)">
          <Icon name="save" />
        </ControlButton>
      </Controls>

      <NodeModal v-if="modal.modalOpen.value" :node="selectedNode" />
    </VueFlow>
  </div>
</template>

<style></style>
