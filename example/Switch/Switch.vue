<template lang="html">
  <div :class="switchClass" @click="toggle">
    <span :class="`${prefixCls}__inner`">
      <span v-if="value">True</span>
      <span v-if="!value">False</span>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'zk-switch',
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        prefixCls: 'zk-switch',
      };
    },
    computed: {
      switchClass() {
        return [
          `${this.prefixCls}`,
          {
            [`${this.prefixCls}--checked`]: this.value,
            [`${this.prefixCls}--disabled`]: this.disabled,
          },
        ];
      },
    },
    methods: {
      toggle() {
        if (this.disabled) {
          return false;
        }
        const value = !this.value;
        this.$emit('input', value);
        return this.$emit('on-change', value);
      },
    },
  };
</script>

<style lang="less" src="./Switch.less"></style>
