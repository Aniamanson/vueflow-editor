<script setup>
import FormInput from '../formItems/FormInput.vue'
import { ref, computed } from 'vue'
import { phoneValidate, length, required, validate } from '@/utils/validation.js'
import { useStore } from '@/stores/store.js'

const props = defineProps(['node'])

const graphStore = useStore()

const phone = ref(props.node.data.phone || null)
const text = ref(props.node.data.text || null)

const phoneStatus = computed(() => {
  return validate(phone.value, [required, phoneValidate, length({ min: 6, max: 16 })])
})

const textStatus = computed(() => {
  return validate(text.value, [required])
})

const isInvalid = computed(() => {
  return !phoneStatus.value.valid || !textStatus.value.valid
})

const submitForm = () => {
  const nodeData = { id: props.node.id, data: { phone: phone.value, text: text.value } }
  graphStore.updateNodeInternalStructure(nodeData)
}
</script>

<template>
  <h3 class="modal-title">Enter Data</h3>
  <form class="form">
    <FormInput name="Phone" v-model="phone" :input-status="phoneStatus" type="text" placeholder="+7 905 999 99 99" />
    <FormInput name="Message" v-model="text" :input-status="textStatus" type="text" placeholder="Your text" />
    <button class="button is-primary" :disabled="isInvalid" @click.prevent="submitForm" type="submit">Save</button>
  </form>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
}
.button.is-primary {
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: 500;
  background: rgba(114, 244, 255, 1);
  color: #fffffb;
  border-radius: 3px;
  width: 130px;
  align-self: end;
  text-transform: uppercase;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: auto;
  }
}
</style>
