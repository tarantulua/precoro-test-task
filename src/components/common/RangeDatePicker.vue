<script setup lang="ts">
import { VueDatePicker, type ModelValue } from "@vuepic/vue-datepicker";
import { computed } from "vue";
import BaseIcon from "./BaseIcon.vue";

interface RangeDatePickerProps {
  minDate?: Date;
  hasTimePicker?: boolean;
}

const { minDate, hasTimePicker = false } = defineProps<RangeDatePickerProps>();

const modelValue = defineModel<ModelValue>();

const formatDate = (date: Date | number) => {
  if (typeof date === "number") {
    return new Date(date).toLocaleDateString("en-CA");
  }

  return date.toLocaleDateString("en-CA");
};

const formattedValue = computed(() => {
  if (!modelValue.value) {
    return;
  }

  const [from, to] = modelValue.value as (Date | number)[];

  if (!from || !to) {
    return;
  }

  return `From ${formatDate(from)} to ${formatDate(to)}`;
});

const clearValue = () => {
  modelValue.value = undefined;
};
</script>

<template>
  <label class="range-date-picker">
    <div class="range-date-picker__input">
      <BaseIcon icon="calendar" :height="20" :width="18" />

      <span class="input__value">
        <template v-if="formattedValue">
          <b>
            {{ formattedValue }}
          </b>
        </template>

        <template v-else>
          <b>From</b> yyyy-mm-dd <b>to</b> yyyy-mm-dd
        </template>
      </span>

      <BaseIcon
        class="input_clear"
        v-if="modelValue"
        icon="cancel"
        @click.prevent="clearValue"
      />
    </div>

    <VueDatePicker
      v-model="modelValue"
      :range="{ partialRange: false }"
      :min-date="minDate"
      :time-config="{ enableTimePicker: hasTimePicker }"
    />
  </label>
</template>

<style scoped>
.range-date-picker {
  width: 100%;
  .range-date-picker__input {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 2.5rem;
    border: 1px solid var(--border-color-main);
    width: 100%;
    border-radius: 0.3125rem;
    padding: 0.375rem 0.75rem;
    color: var(--text-color-main);
    transition: border-color var(--default-transition-duration) ease-in-out;

    .input__value {
      font-size: 0.875rem;
      line-height: 2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
      font-weight: 500;
      color: var(--text-color-secondary);

      b {
        font-weight: 600;
        color: var(--text-color-main);
      }
    }

    .input_clear {
      transition: background-color var(--default-transition-duration) ease-in-out;
      @media (hover) {
        &:hover {
          background-color: black;
        }
      }
    }

    .button {
      color: var(--border-color-input);
    }

    @media (hover) {
      &:hover {
        border-color: var(--border-color-input);
      }
    }
  }

  &:deep(.dp__main) {
    .dp__input_wrap {
      display: none;
    }
  }
}
</style>
