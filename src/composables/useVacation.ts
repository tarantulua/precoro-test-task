import { useVacationStore } from "@/store/useVacationStore";
import { storeToRefs } from "pinia";

export const useVacation = () => {
  const store = useVacationStore();

  const {
    getApprovalSteps,
    getDocuments,
    getMappedDocumentsData,
    getFormSubstituteUser,
    getFromValueBackupApprovers,
    getIsFormValid,
    getVacationMode,
    getIsFormChanged,
    getUiFlags,
  } = storeToRefs(store);

  return {
    approvalSteps: getApprovalSteps,
    documents: getDocuments,
    mappedDocumentsData: getMappedDocumentsData,
    formBackupApprovers: getFromValueBackupApprovers,
    formSubstituteUser: getFormSubstituteUser,
    isFormValid: getIsFormValid,
    vacationMode: getVacationMode,
    isFormChanged: getIsFormChanged,
    uiFlags: getUiFlags,
    fetchData: store.fetchData,
    initializeFormValue: store.initializeFormValue,
    changeBackupApprover: store.changeBackupApprover,
    changeSubstituteUser: store.changeSubstituteUser,
    changeVacationMode: store.changeVacationMode,
    submitVacationForm: store.submitVacationForm,
    changeUiFlag: store.changeUiFlag,
  };
};
