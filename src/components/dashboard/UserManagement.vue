<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import { useUsers } from "@/composables/useUsers";
import { useVacation } from "@/composables/useVacation";
import InfoSection from "@/components/common/InfoSection.vue";
import { ButtonShape } from "@/types/components";
import Button from "@/components/common/Button.vue";
import RangeDatePicker from "@/components/common/RangeDatePicker.vue";
import StatusLabel from "@/components/common/StatusLabel.vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import DocumentApprovalTable from "@/components/dashboard/DocumentApprovalTable/DocumentApprovalTable.vue";
import type { UserSelectOption } from "@/types/common";
import UserSelect from "@/components/dashboard/UserSelect.vue";

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
      class="user-management__vacation"
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
      class="user-management__substitute"
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
      class="user-management__approver"
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

  .user-management__vacation {
    &:deep(.info-section__info) {
      .info__title {
        line-height: 1.44;
      }
    }
  }

  .user-management__substitute {
    padding-top: 1rem;
  }

  .user-management__approver {
    padding-top: 1.25rem;
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
