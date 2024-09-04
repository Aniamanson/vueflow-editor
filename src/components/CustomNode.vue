<script setup>
import { computed, ref, watch } from 'vue'
import { useStore } from '../stores/store'
import { Position, Handle } from '@vue-flow/core'
import FormInput from '@/components/formItems/FormInput.vue'
import { required, validate } from '@/utils/validation.js'

const props = defineProps({
  id: String,
  data: Object,
  type: String,
  position: Object,
  selected: Boolean,
  dragging: Boolean
})

const graphStore = useStore()

const inputValue = ref(props.data.trigger || '')
const trigger = ref(!!props.data.trigger)

const textStatus = computed(() => {
  return validate(inputValue.value, [required])
})

const triggerDelete = () => {
  inputValue.value = ''
  trigger.value = false
  graphStore.updateEdges(props.id, null)
}

watch(inputValue, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    const nodeData = { id: props.id, data: { trigger: newValue } }
    graphStore.updateNodeInternalStructure(nodeData)
    graphStore.updateEdges(props.id, newValue)
  }
})
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div v-if="!trigger" class="vue-flow__node-row">
      <p style="white-space: nowrap">Add trigger</p>
      <button class="vue-flow__node-btn vue-flow__node-btn--add" @click.stop="trigger = true"></button>
    </div>
    <div v-if="trigger" class="vue-flow__node-row delete-trigger">
      <FormInput name="Trigger" v-model="inputValue" :input-status="textStatus" type="text" placeholder="Add trigger" />
      <button class="vue-flow__node-btn vue-flow__node-btn--delete" @click.stop="triggerDelete"></button>
    </div>
    <Handle :class="{ active: inputValue }" class="handle" type="source" :position="Position.Bottom" />
  </div>
</template>

<style lang="scss">
.vue-flow__node-custom {
  width: fit-content;
  padding: 10px;
  border-radius: 3px;
  font-size: 12px;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  color: var(--vf-node-text);
  background-color: var(--vf-node-bg);
  border-color: var(--vf-node-color);

  .handle {
    opacity: 0;
    transition: 0.2s;
    &.active {
      opacity: 1;
    }
  }

  .vue-flow__node {
    &-row {
      display: flex;
      align-items: center;

      &.delete-trigger {
        align-items: flex-end;

        .vue-flow__node-btn--delete {
          margin-bottom: 20px;
        }
      }

      .field {
        margin-bottom: 15px;
      }
    }

    &-btn {
      border: 1px solid;
      margin-left: 8px;
      border-radius: 3px;
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: 0.2s;

      &:before {
        content: '+';
        display: block;
      }

      &--add {
        &:hover {
          border: 1px solid #0041d0;
          color: #0041d0;
        }
      }

      &--delete {
        &:hover {
          border: 1px solid red;
          color: red;
        }

        &:before {
          transform: rotate(45deg);
        }
      }
    }
  }
}
</style>
