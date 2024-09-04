<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  name: String,
  modelValue: String,
  inputStatus: Object,
  type: String,
  placeholder: String
})

let isDirty = false

const emit = defineEmits(['update:modelValue'])

const isInvalid = computed(() => {
  return !props.inputStatus.valid && isDirty
})

function handleInput(e) {
  isDirty = true
  const value = e.target.value
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="field">
    <label :for="name" class="label">
      {{ name }}
    </label>
    <div class="control">
      <input
        :type="props.type"
        :id="props.name"
        class="input"
        :class="{ 'is-danger': isInvalid, 'is-success': inputStatus.valid }"
        :value="modelValue"
        :placeholder="props.placeholder"
        @input="handleInput" />
    </div>
    <p v-if="isInvalid" class="is-danger help">
      {{ inputStatus.message }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.field {
  display: block;
  margin-bottom: 25px;
  position: relative;
}
.label {
  text-align: left;
  display: block;
}
.input {
  background: transparent;
  border: 1px solid #1a192b;
  border-radius: 3px;
  color: #2c3e50;
  padding: 8px 15px;
  font-size: 16px;
  width: 100%;
  &.is-danger {
    border-color: red;
  }

  &::placeholder {
    color: #1a192b;
    opacity: 0.5;
  }
}

.is-danger.help {
  position: absolute;
  font-size: 12px;
  color: red;
  text-transform: none;
  bottom: -20px;
  left: 0;
}

.dark .input {
  border: 1px solid #fffffb;
  color: #fffffb;

  &::placeholder {
    color: #fffffb;
  }
}
</style>
