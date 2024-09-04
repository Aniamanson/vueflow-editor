<script setup>
import { useModal } from '@/composables/useModals.js'
import { computed } from 'vue'
const props = defineProps(['node'])
const emit = defineEmits(['save'])

const modal = useModal()

const modalType = computed(() => {
  return modal.showModal(props.node.type)
})
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <button class="modal-close" @click="modal.hideModal()"></button>
      <component :is="modalType" :node="props.node"></component>
    </div>
  </div>
</template>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: auto;
  padding: 20px 30px;
  margin: 15px;
  background: white;
  box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2);
  border: 1px solid #fffffb;
  border-radius: 3px;
  z-index: 100;

  &-title {
    margin-bottom: 20px;
  }

  &-close {
    box-sizing: content-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    cursor: pointer;
    user-select: none;
    padding: 10px 12px;
    border: none;
    transition: 0.2s;
    position: absolute;
    top: -1px;
    right: -1px;
    background: transparent;

    &:before {
      content: '+';
      display: block;
      transform: rotate(45deg);
      font-weight: 500;
      font-size: 30px;
    }

    &:hover {
      opacity: 0.5;
    }
  }

  @media screen and (max-width: 800px) {
    bottom: 0;
    top: auto;
    padding: 10px 20px;

    &-title {
      font-size: 14px;
      margin-bottom: 10px;
    }

    .field {
      flex: 1 1 45%;
      margin: 0;
    }

    .label,
    .input {
      font-size: 12px;
    }

    .button.is-primary {
      padding: 8px 10px;
      font-size: 12px;
      justify-self: flex-end;
      margin-left: auto;
    }

    .form {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      gap: 15px;
    }
  }

  @media screen and (max-width: 640px) {
    left: 0;
    right: auto;
    max-width: 100%;
    margin: 0;
  }

  @media screen and (max-width: 500px) {
    .field {
      flex: 1 1 100%;
    }
  }
}

.dark .modal {
  background: #4a5568;
  color: #fffffb;

  &-close {
    color: #fffffb;
  }
}
</style>
