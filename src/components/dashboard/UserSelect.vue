<script setup lang="ts">
import { useWorkersApi } from "@/api/useWorkersApi";
import SearchableSelect from "@/components/common/SearchableSelect.vue";
import type { Pagination, UserSelectOption } from "@/types/common";
import type { FetchUserParams } from "@/types/request";
import type { User } from "@/types/workers";
import { computed, onWatcherCleanup, ref, watch } from "vue";

interface UserSelectProps {
  initialUsers: User[];
  initialPagination: Pagination;
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
}

const TIMEOUT_VALUE = 300;

let debounceTimeout: number;

const { initialUsers, initialPagination, placeholder, label, isRequired } =
  defineProps<UserSelectProps>();

const { fetchUsers } = useWorkersApi();

const model = defineModel<UserSelectOption>();

const modelComputed = computed({
  get() {
    return model.value?.value;
  },
  set(id?: number) {
    const user = options.value.find((value) => value.value === id);

    if (!user) {
      model.value = undefined;
      return;
    }

    model.value = user;
  },
});

const users = ref<User[]>(initialUsers);
const pagination = ref<Pagination>(initialPagination);
const query = ref<string>("");
const isLoading = ref<boolean>(false);

const requestParams = computed<FetchUserParams>(() => ({
  page: pagination.value.currentPage,
  search: query.value,
}));

const options = computed<UserSelectOption[]>(() => {
  const result = users.value.map((user) => ({
    label: user.email,
    value: user.id,
  }));

  if (model.value?.value == null) {
    return result;
  }

  const isModelValueInList = result.some(
    (value) => value.value === model.value?.value,
  );

  return isModelValueInList ? result : [model.value, ...result];
});

const hasMore = computed(() => {
  return pagination.value.currentPage < pagination.value.totalPages;
});

const handleLoadMore = async () => {
  pagination.value = {
    ...pagination.value,
    currentPage: pagination.value.currentPage + 1,
  };

  isLoading.value = true;
  const response = await fetchUsers(requestParams.value);
  isLoading.value = false;

  if (!response) {
    return;
  }

  users.value = [...users.value, ...response.data];
  pagination.value = response.meta.pagination;
};

const handleFetchUsers = async () => {
  isLoading.value = true;
  const response = await fetchUsers(requestParams.value);
  isLoading.value = false;

  if (!response) {
    return;
  }

  users.value = response.data;
  pagination.value = response.meta.pagination;
};

watch(query, async () => {
  pagination.value = { ...pagination.value, currentPage: 1, totalPages: 1 };

  debounceTimeout = setTimeout(() => {
    handleFetchUsers();
  }, TIMEOUT_VALUE);

  onWatcherCleanup(() => {
    clearTimeout(debounceTimeout);
  });
});
</script>

<template>
  <SearchableSelect
    v-model="modelComputed"
    v-model:query="query"
    :options="options"
    :is-loading="isLoading"
    :has-more="hasMore"
    :placeholder="placeholder"
    :label="label"
    :is-required="isRequired"
    @load-more="handleLoadMore"
  />
</template>

<style></style>
