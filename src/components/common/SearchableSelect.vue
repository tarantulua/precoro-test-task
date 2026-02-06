<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  onWatcherCleanup,
  ref,
  useTemplateRef,
  watch,
} from "vue";
import { useFloatingDropdown } from "../../composables/useFloatingDropdown";
import BaseIcon from "./BaseIcon.vue";
import LoadingSpinner from "./LoadingSpinner.vue";

interface SearchableSelectProps {
  id?: string;
  options: { label: string; value: any }[];
  placeholder?: string;
  hasMore?: boolean;
  isLoading?: boolean;
  label?: string;
  maxDropdownHeight?: number;
  isRequired?: boolean;
}

let intersectionObserver: IntersectionObserver;

const {
  id = crypto.randomUUID(),
  maxDropdownHeight = 10,
  options,
  placeholder,
  hasMore = false,
  isLoading = false,
  isRequired = false,
} = defineProps<SearchableSelectProps>();

const modelValue = defineModel();
const modelQuery = defineModel("query");

const emit = defineEmits(["load-more"]);

const isOpen = ref<boolean>(false);
const container = useTemplateRef("searchable-select-container");
const dropdownContainer = useTemplateRef("dropdown-container");
const lastListElement = useTemplateRef("last-list-element");

const { dropdownStyles, updatePosition } = useFloatingDropdown(
  container,
  maxDropdownHeight,
);

const inputValue = computed({
  get() {
    return isOpen.value ? modelQuery.value : selectedValue.value?.label;
  },

  set(newValue) {
    modelQuery.value = newValue;
  },
});

const selectedValue = computed(() => {
  return options.find((value) => value.value === modelValue.value);
});

const openDropdown = () => {
  isOpen.value = true;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const handleClickOutside = (e: MouseEvent) => {
  if (!container.value || container.value.contains(e.target as Node)) {
    return;
  }

  isOpen.value = false;
};

const handleOnOptionClick = (value: any) => {
  modelValue.value = modelValue.value === value ? undefined : value;
  closeDropdown();
};

const handleSetupObserver = () => {
  if (!lastListElement.value) {
    return;
  }

  intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry) {
        return;
      }

      if (entry.isIntersecting && hasMore) {
        emit("load-more");
      }
    },
    { threshold: 1.0 },
  );

  intersectionObserver.observe(lastListElement.value);
};

const scrollToTop = () => {
  if (!dropdownContainer.value) {
    return;
  }

  dropdownContainer.value.scrollTop = 0;
};

const setupListeners = () => {
  window.addEventListener("scroll", updatePosition, true);
  window.addEventListener("resize", updatePosition);
  handleSetupObserver();
};

const clearListeners = () => {
  window.removeEventListener("scroll", updatePosition, true);
  window.removeEventListener("resize", updatePosition);
  intersectionObserver?.disconnect();
};

watch(isOpen, async (open) => {
  onWatcherCleanup(() => {
    clearListeners();
  });

  if (open) {
    await nextTick();
    updatePosition();
    setupListeners();
  } else {
    clearListeners();
  }
});

watch(modelQuery, () => {
  scrollToTop();
});

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="searchable-select-container">
    <label
      v-if="label"
      class="container__label"
      :for="id"
      :class="{
        'label--required': isRequired,
      }"
    >
      {{ label }}
    </label>

    <div
      ref="searchable-select-container"
      class="searchable-select"
      @click="openDropdown"
    >
      <input
        :id="id"
        class="searchable-select__input"
        v-model="inputValue"
        :placeholder="placeholder"
        autocomplete="off"
        type="text"
      />

      <BaseIcon
        class="searchable-select__mark"
        :class="{
          'searchable-select__mark--open': isOpen,
        }"
        icon="chevron-filled"
        :width="12"
        :height="8"
      />

      <Teleport to="#modal-container">
        <Transition>
          <div
            v-if="isOpen"
            class="searchable-select__dropdown"
            ref="dropdown-container"
            :style="dropdownStyles"
            @click.stop
          >
            <ul
              class="dropdown__list"
              :style="{
                maxHeight: `${maxDropdownHeight}rem`,
              }"
            >
              <template v-if="options.length">
                <li
                  class="list__option"
                  :class="{
                    'list__option--selected':
                      selectedValue?.value === option.value,
                  }"
                  v-for="option in options"
                  @click="handleOnOptionClick(option.value)"
                >
                  {{ option.label }}
                </li>
              </template>

              <li class="list__option list__empty" v-else>No items</li>

              <li
                ref="last-list-element"
                class="list__option list__option--last"
              />
            </ul>

            <LoadingSpinner :is-shown="isLoading" />
          </div>
        </Transition>
      </Teleport>
    </div>
  </div>
</template>

<style>
.searchable-select-container {
  width: 100%;

  .container__label {
    font-weight: 600;
    font-size: 0.8125rem;
    line-height: 0.9375rem;
    color: var(--text-color-secondary);
    margin-bottom: 0.125rem;
    display: block;

    &.label--required {
      &::after {
        content: "*";
        color: red;
        margin-left: 0.25rem;
      }
    }
  }

  .searchable-select {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    height: 2.125rem;
    width: 100%;
    border: 1px solid var(--border-color-input);
    padding: 0.375rem 0.5rem;
    border-radius: 0.5rem;
    background: #fff;

    .searchable-select__input {
      outline: none;
      border: none;
      width: 100%;
      height: 100%;
      color: var(--text-color-main);
      line-height: 144%;
      background: transparent;

      &::placeholder {
        opacity: 0.75;
      }
    }

    .searchable-select__mark {
      color: var(--text-color-main);
      transition: transform 200ms ease-in-out;

      &.searchable-select__mark--open {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
