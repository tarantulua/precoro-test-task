<script setup lang="ts">
import { computed } from "vue";
import ApprovalStepRow from "./ApprovalStepRow.vue";
import type { DocumentApprovalData } from "@/types/workers";

interface DocumentApprovalTableProps {
  data: DocumentApprovalData[];
}

const { data } = defineProps<DocumentApprovalTableProps>();

const headers = computed(() => {
  return ["Document", "Approval Step", "Backup Approver"];
});
</script>

<template>
  <div class="document-approval-table">
    <div class="document-approval-table__header">
      <span class="header-cell" v-for="header in headers">
        {{ header }}
      </span>
    </div>

    <div class="document-approval-table__body">
      <div class="body__row" v-for="document in data" :key="document.id">
        <div class="row_document body_cell">
          {{ document.name }}
        </div>

        <div class="row_steps">
          <ApprovalStepRow
            v-for="step in document.approvalSteps"
            :key="step.id"
            :approval-step="step"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.document-approval-table {
  display: grid;
  height: 100%;
  width: 100%;
  font-size: 0.875rem;
  overflow: auto;

  --cell-height: 2.5rem;
  --cell-border-radius: 0.625rem;

  .header_cell,
  .body_cell {
    display: flex;
    align-items: center;
    height: var(--cell-height);
  }

  .document-approval-table__header {
    display: grid;
    grid-template-columns: minmax(12rem, 17.5rem) repeat(2, minmax(12rem, 1fr));
    position: sticky;
    top: 0;
    z-index: 1;

    background-color: var(--background-color-light);
    color: #555b7d;
    font-weight: 600;
    border-radius: var(--cell-border-radius) var(--cell-border-radius) 0 0;

    & > span {
      padding: 0.3125rem 1rem;
    }
  }

  .document-approval-table__body {
    display: grid;
    gap: 1.25rem;
    overflow: hidden;

    .body__row {
      display: grid;
      grid-template-columns: minmax(12rem, 17.5rem) minmax(24rem, 1fr);
      color: var(--text-color-main);
      font-weight: 500;
      align-items: flex-start;

      .row_document {
        font-weight: 600;
        padding: 0.75rem 1rem;
        border: 1px solid #415ada1a;
        border-radius: var(--cell-border-radius) 0 0 var(--cell-border-radius);
        border-right: none;
      }

      .row_steps {
        display: grid;
        align-items: flex-start;
      }

      &:first-child {
        .row_document {
          border-top-left-radius: 0;
        }

        .steps__row {
          &:first-child {
            .body_cell:last-child {
              border-top-right-radius: 0;
            }
          }
        }
      }
    }
  }
}
</style>
