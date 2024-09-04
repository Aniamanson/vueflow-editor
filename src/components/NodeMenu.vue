<script setup>
import { useStore } from '../stores/store'
import useDragAndDrop from '../composables/useDnD'
import { reactive } from 'vue'

const graphStore = useStore()

const { onDragStart } = useDragAndDrop()
const nodesType = reactive({
  start: {
    name: 'Start Node',
    type: 'input'
  },
  state: {
    name: 'State Node',
    type: 'custom'
  },
  sms: {
    name: 'Send SMS Node',
    type: 'output'
  }
})

const selectNode = (type) => {
  const node = {
    id: `node-${type}-${Date.now()}`,
    type,
    position: { x: 100, y: 100 },
    data: { label: type.charAt(0).toUpperCase() + type.slice(1) }
  }
  graphStore.addElement(node)
}
</script>

<template>
  <aside>
    <div class="description">You can drag these nodes to the pane.</div>

    <div class="nodes">
      <div
        v-for="(node, key) in nodesType"
        :key="key"
        class="vue-flow__node-input"
        :draggable="true"
        @dragstart="onDragStart($event, node.name, node.type)"
        @dblclick="selectNode(key)">
        {{ node.name }}
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
aside {
  color: #fff;
  font-weight: 700;
  border-right: 1px solid #eee;
  padding: 15px 10px;
  font-size: 12px;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0 5px 10px #0000004d;
  background: rgb(114 244 255 / 75%);

  .nodes > * {
    margin-bottom: 10px;
    cursor: grab;
    font-weight: 500;
    -webkit-box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.25);
    box-shadow: 5px 5px 10px 2px #00000040;
  }

  .nodes {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .vue-flow__node-input {
    max-width: 200px;
    width: 100%;
  }

  .description {
    margin-bottom: 10px;
  }

  @media screen and (max-width: 640px) {
    .vue-flow__node-input {
      margin: 0;
    }
  }

  @media screen and (max-width: 500px) {
    .nodes {
      flex-wrap: wrap;
      .vue-flow__node-input {
        max-width: 100%;
        flex: 1 1 fit-content;
      }
    }
  }
}
</style>
