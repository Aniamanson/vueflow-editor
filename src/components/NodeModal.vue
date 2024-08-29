<script setup>

const props = defineProps(['node']);
const emit = defineEmits(['save']);

const saveNode = () => {
  emit('save', props.node);
};
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <h3>Configure Node</h3>
      <div v-if="node.type === 'sms'">
        <label>Phone:</label>
        <input v-model="node.data.phone" type="text" />
        <label>Message:</label>
        <input v-model="node.data.message" type="text" />
      </div>
      <div v-if="node.type === 'start'">
        <label>Audience:</label>
        <select v-model="node.data.audience">
          <option>Option 1</option>
          <option>Option 2</option>
        </select>
      </div>
      <button @click="saveNode">Save</button>
    </div>
  </div>
</template>

<style>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0,0,0,0.3);
}
.modal-content {
  padding: 20px;
}
</style>
