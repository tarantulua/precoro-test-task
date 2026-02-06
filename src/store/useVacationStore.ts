import type { Nullable } from "../types/common";
import { useWorkersApi } from "../api/useWorkersApi";
import { defineStore } from "pinia";
import type { VacationFormValue, VacationStore } from "../types/store";
import type {
  ApprovalDocument,
  ApprovalStep,
  UserWithoutFullname,
  BackupApprovers,
} from "../types/workers";
import {
  convertVacationFormValueToDto,
  mapDocumentsData,
} from "../helpers/dataHelper";

const initialFormValue: VacationFormValue = {
  vacationMode: {
    enable: true,
    endDate: null,
    startDate: null,
  },
  substituteUser: null,
  backupApprovers: {},
};

export const useVacationStore = defineStore("vacation", {
  state: (): VacationStore => ({
    approvalSteps: [],
    documents: [],
    formValue: initialFormValue,
    uiFlags: {
      isFormSubmitting: false,
    },
  }),

  getters: {
    getApprovalSteps(state): ApprovalStep[] {
      return state.approvalSteps;
    },

    getDocuments(state): ApprovalDocument[] {
      return state.documents;
    },

    getMappedDocumentsData(state) {
      return mapDocumentsData(state.approvalSteps, state.documents).filter(
        (value) => value.approvalSteps?.length,
      );
    },

    getFormValue(state) {
      return state.formValue;
    },

    getVacationMode(state) {
      return state.formValue.vacationMode;
    },

    getFromValueBackupApprovers(state) {
      return state.formValue.backupApprovers;
    },

    getFormSubstituteUser(state) {
      return state.formValue.substituteUser;
    },

    getIsFormValid(state) {
      const { backupApprovers, substituteUser, vacationMode } = state.formValue;
      if (!substituteUser) {
        return false;
      }

      if (!vacationMode.startDate || !vacationMode.endDate) {
        return false;
      }

      return !Object.values(backupApprovers).some((value) => !value);
    },

    getIsFormChanged(state) {
      const { backupApprovers, substituteUser, vacationMode } = state.formValue;

      if (substituteUser) {
        return true;
      }

      if (vacationMode.startDate || vacationMode.endDate) {
        return true;
      }

      return Object.values(backupApprovers).some((value) => !!value);
    },

    getUiFlags(state) {
      return state.uiFlags;
    },
  },

  actions: {
    async fetchData() {
      const { fetchData } = useWorkersApi();

      const data = await fetchData();

      if (!data) {
        return;
      }

      this.documents = data.data.documents;
      this.approvalSteps = data.data.approvalSteps;
    },

    initializeFormValue() {
      const backupApprovers = this.getMappedDocumentsData.reduce(
        (acc, value) => {
          const newValue = { ...acc };
          value.approvalSteps.forEach((step) => {
            newValue[step.id] = null;
          });

          return newValue;
        },
        {} as BackupApprovers,
      );

      this.formValue = { ...this.formValue, backupApprovers };
    },

    clearFormValue() {
      this.formValue = { ...initialFormValue };
      this.initializeFormValue();
    },

    changeBackupApprover(
      id: number,
      backupApprover: Nullable<UserWithoutFullname>,
    ) {
      this.formValue = {
        ...this.formValue,
        backupApprovers: {
          ...this.formValue.backupApprovers,
          [id]: backupApprover,
        },
      };
    },

    changeSubstituteUser(user: Nullable<UserWithoutFullname>) {
      this.formValue = {
        ...this.formValue,
        substituteUser: user,
      };
    },

    changeVacationMode(dates: Nullable<[Date, Date]>) {
      const newValue = { ...this.formValue };

      if (!dates) {
        newValue.vacationMode = {
          ...newValue.vacationMode,
          startDate: null,
          endDate: null,
        };
      } else {
        newValue.vacationMode = {
          ...newValue.vacationMode,
          startDate: dates[0].getTime(),
          endDate: dates[1].getTime(),
        };
      }

      this.formValue = newValue;
    },

    async submitVacationForm() {
      if (!this.getIsFormValid) {
        return;
      }

      const dto = convertVacationFormValueToDto(this.formValue);

      if (!dto) {
        return;
      }

      const { updateVacation } = useWorkersApi();

      this.uiFlags = { ...this.uiFlags, isFormSubmitting: true };
      const result = await updateVacation(dto);
      this.uiFlags = { ...this.uiFlags, isFormSubmitting: false };

      if (!result) {
        return;
      }

      this.clearFormValue();
    },
  },
});
