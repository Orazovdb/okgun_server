<template>
  <div class="popup">
    <div class="popup__container __container">
      <div class="popup__content">
        <div class="popup__box">
          <div class="popup__head">
            <p>{{ title }}</p>
            <div @click="$emit('close')">
              <base-icon icon="close"></base-icon>
            </div>
          </div>
          <div class="popup__body">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => "",
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(51, 51, 51, 0.4);
  backdrop-filter: blur(5px);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 10;
  &__container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__head {
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #e5e5e7;
    p {
      flex: 1 1 auto;
      color: #222228;
      font-size: 16px;
      font-weight: 700;
      line-height: 120%;
    }
  }
  &__body {
    padding: 20px;
  }
  &__box {
    background-color: white;
    border-radius: 10px;
    width: 650px;
    display: flex;
    flex-direction: column;
    max-height: calc(100% - 100px);
    overflow: auto;
    &::-webkit-scrollbar {
      width: 8px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: var(--primary);
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
}
</style>
