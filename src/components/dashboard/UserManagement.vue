<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import DocumentApprovalTable from "./DocumentApprovalTable/DocumentApprovalTable.vue";
import { useUsers } from "../../composables/useUsers";
import { useVacation } from "../../composables/useVacation";
import UserSelect from "./UserSelect.vue";
import type { UserSelectOption } from "../../types/common";
import Button from "../common/Button.vue";
import { ButtonShape } from "../../types/components";
import InfoSection from "../common/InfoSection.vue";
import StatusLabel from "../common/StatusLabel.vue";
import RangeDatePicker from "../common/RangeDatePicker.vue";
import LoadingSpinner from "../common/LoadingSpinner.vue";

const { fetchUsers, users, pagination } = useUsers();
const {
  vacationMode,
  mappedDocumentsData,
  formSubstituteUser,
  isFormValid,
  isFormChanged,
  uiFlags,
  fetchData,
  initializeFormValue,
  changeSubstituteUser,
  changeVacationMode,
  submitVacationForm,
} = useVacation();

const substituteUser = computed({
  get() {
    if (formSubstituteUser.value?.id == null) {
      return;
    }

    return {
      label: formSubstituteUser.value.email,
      value: formSubstituteUser.value.id,
    };
  },

  set(user?: UserSelectOption) {
    changeSubstituteUser(user ? { id: user.value, email: user.label } : null);
  },
});

const date = computed({
  get() {
    const { startDate, endDate } = vacationMode.value;
    if (!startDate || !endDate) {
      return;
    }

    return [startDate, endDate];
  },

  set(dates: [Date, Date]) {
    changeVacationMode(dates);
  },
});

const handleSubmitForm = async () => {
  console.log("sumbit");
  await submitVacationForm();
};

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  if (!isFormChanged.value) {
    return;
  }

  event.preventDefault();
};

onMounted(async () => {
  window.addEventListener("beforeunload", handleBeforeUnload);

  await fetchData();
  initializeFormValue();
  await fetchUsers();
});

onUnmounted(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});
</script>

<template>
  <form class="user-management" @submit.prevent="handleSubmitForm">
    <InfoSection class="user-management__header" title="Vacation Mode Settings">
      <Button
        class="header__button"
        :class="{
          'tooltip tooltip--bottom-right': !isFormValid,
        }"
        data-tooltip="Choose Date, Substitute  User and Backup Approver to enable Vacation Mode"
        :disabled="!isFormValid"
        :shape="ButtonShape.ROUNDED"
        type="submit"
      >
        Update
      </Button>
    </InfoSection>

    <InfoSection
      title="Vacation mode"
      text="Select Date, Substitute User and Backup Approver to Enable Vacation Mode."
    >
      <RangeDatePicker
        v-model="date"
        class="user-management__date"
        :min-date="new Date()"
      />

      <template #title>
        <StatusLabel
          :is-enabled="isFormValid"
          disabled-text="Disabled"
          enabled-text="Enabled"
        />
      </template>
    </InfoSection>

    <hr class="user-management__line" />

    <InfoSection
      title="Substitute User"
      text="Performs approval actions while you are away."
    >
      <UserSelect
        v-if="users && pagination"
        v-model="substituteUser"
        class="user-management__substitute-user"
        :initial-users="users"
        :initial-pagination="pagination"
        placeholder="Select Substitute"
        label="Substitute User"
        is-required
      />
    </InfoSection>

    <hr class="user-management__line" />

    <InfoSection
      title="Backup Approver"
      text="Performs approval actions while you are away. Below, you can select the necessary Approvers."
      direction="column"
    >
      <DocumentApprovalTable
        v-if="mappedDocumentsData"
        :data="mappedDocumentsData"
      />
    </InfoSection>

    <LoadingSpinner :is-shown="uiFlags.isFormSubmitting" />
  </form>
</template>

<style scoped>
.user-management {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;

  .user-management__header {
    padding: 0.875rem 1.5rem 0.875rem 1.5rem;
    border-bottom: 2px solid var(--border-color-main);

    .header__button {
      font-weight: 600;
      line-height: 1;
      font-size: 0.875rem;
      height: 1.75rem;
    }

    &:deep(.info-section__info) {
      .info__title {
        font-weight: 700;
        font-size: 1.25rem;
      }
    }
  }

  .user-management__date {
    max-width: 19.375rem;
    width: max-content;
  }

  .user-management__substitute-user {
    max-width: 22.25rem;
  }

  .user-management__line {
    margin: 0 1.25rem;
  }

  @media (max-width: 768px) {
    .user-management__date,
    .user-management__substitute-user {
      max-width: 100%;
      width: 100%;
    }

    &:deep(.info-section) {
      &:not(.user-management__header) {
        flex-direction: column !important;
      }
    }
  }
}
</style>
