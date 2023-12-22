<template>
  <div class="row2__inputs input">
    <span class="row__title">{{ label }}</span>
    <div
      @click="openDropdown"
      :class="[
        'input__input inp',
        {
          active: isActive,
          'width-200': isDocument,
          un_border: unBorder,
          disabled: disabled,
          error: isError,
          'is-disabled': isDisabled,
          'width-179': isStateNumber,
          'width-100': isLegalSeries,
        },
      ]"
    >
      <div class="input__selected">{{ title }}</div>
      <div :class="['input__body', { autoScroll: isScroll }]">
        <div
          v-for="item in filteredItems"
          :key="item.name"
          @click="selectItem(item)"
          class="input__text text"
        >
          {{ item.name }}
        </div>
      </div>
      <div
        v-if="!isDisabled && filteredItems.length > 1"
        class="input__icon icon"
      >
        <base-icon name="chevronBottom" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseIcon from "@/components/base/BaseIcon.vue";

export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isDocument: {
      type: Boolean,
      default: false,
    },
    isScroll: {
      type: Boolean,
      default: false,
    },
    unBorder: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isStateNumber: {
      type: Boolean,
      default: false,
    },
    isError: {
      type: Boolean,
      default: false,
    },
    isLegalSeries: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      filteredItems: [],
    };
  },
  watch: {
    items(newItems) {
      this.filteredItems = newItems.filter((item) => item.name !== this.title);
    },
  },
  methods: {
    selectItem(item) {
      this.$emit("selectItem", item);
    },
    openDropdown() {
      this.$emit("open", this.isActive);
    },
  },
  components: {
    BaseIcon,
  },
};
</script>
<style lang="scss" scoped>
.disabled {
  color: #ccc;
}

.width-200 {
  width: 200px;
}
.width-179 {
  width: 179px;
}
.width-100 {
  width: 100px;
}
.autoScroll {
  height: 90px;
  overflow: auto;
}
.un_border {
  border-radius: 6px 0px 0px 6px;
}

.input__input {
  cursor: pointer;
}
.error {
  box-shadow: 0px 0px 0px 1px red;
}
.disabled {
  background-color: #ccc;
  user-select: none;
  cursor: not-allowed;
}
.is-disabled {
  background-color: #ccc;
  user-select: none;
  cursor: not-allowed;
}
.input__input {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 46px;
  background: #ffffff;
  border: 1px solid #dedede;
  border-radius: 6px;
  overflow: hidden;
  input {
    width: 100%;
    height: 46px;
    padding: 0px 14px;
  }

  // .input__input_l

  &_l {
    @extend.input__input;
  }
}
</style>
