<script setup lang="ts">
import { useUsers } from "@/composables/useUsers";
import { useVacation } from "@/composables/useVacation";
import type { ApprovalStep } from "@/types/workers";
import type { UserSelectOption } from "@/types/common";
import { computed } from "vue";

interface ApprovalStepRowProps {
  approvalStep: ApprovalStep;
}

const { approvalStep } = defineProps<ApprovalStepRowProps>();

const { pagination, users } = useUsers();
const { changeBackupApprover, formBackupApprovers } = useVacation();

const backupApprover = computed(() => {
  return formBackupApprovers.value[approvalStep.id];
});

const backupApproverModel = computed({
  get() {
    if (backupApprover.value?.id == null) {
      return;
    }

    return {
      label: backupApprover.value.email,
      value: backupApprover.value.id,
    };
  },

  set(newValue?: UserSelectOption) {
    changeBackupApprover(
      approvalStep.id,
      newValue
        ? {
            email: newValue.label,
            id: newValue.value,
          }
        : null,
    );
  },
});
</script>

<template>
  <div class="steps__row">
    <div class="row__step body_cell">
      <span class="step__number">
        {{ approvalStep.stepNumber }}
      </span>

      <span>
        {{ approvalStep.stepName }}
      </span>
    </div>

    <span class="row_select body_cell">
      <UserSelect
        v-if="users && pagination"
        v-model="backupApproverModel"
        :initial-pagination="pagination"
        :initial-users="users"
        placeholder="Select"
      />
    </span>
  </div>
</template>

<style>
.steps__row {
  display: grid;
  grid-template-columns: 1fr 1fr;

  .body_cell {
    padding: 0.75rem 1rem;
    border: 1px solid #415ada1a;

    &:first-child {
      border-right: none;
    }
  }

  .row__step {
    display: flex;
    gap: 0.5rem;

    .step__number {
      height: 1.25rem;
      aspect-ratio: 1/1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      color: white;
      background-color: #415ada;
      font-weight: 700;
      font-size: 0.75rem;
    }
  }

  .row_select {
    padding: 0;

    .searchable-select-container {
      .searchable-select {
        border: none;
        height: 100%;
        width: 100%;
      }
    }
  }

  &:first-child {
    .body_cell:last-child {
      border-top-right-radius: var(--cell-border-radius);
    }
  }

  &:last-child {
    &:not(:first-child) .body_cell:first-child {
      border-bottom-left-radius: var(--cell-border-radius);
    }

    .body_cell:last-child {
      border-bottom-right-radius: var(--cell-border-radius);
    }
  }

  &:not(:first-child):not(:last-child) {
    .body_cell {
      border-top: none;
      border-bottom: none;
    }
  }
}
</style>
