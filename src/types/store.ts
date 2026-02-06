import type { Nullable, Pagination } from "./common";
import type { ToastMessage } from "./components";
import type {
  ApprovalDocument,
  ApprovalStep,
  BackupApprovers,
  User,
  UserWithoutFullname,
  VacationMode,
} from "./workers";

export interface UsersStore {
  users: User[];
  pagination: Nullable<Pagination>;
}

export interface VacationFormValue {
  vacationMode: VacationMode;
  substituteUser: Nullable<UserWithoutFullname>;
  backupApprovers: BackupApprovers;
}

export interface VacationStore {
  approvalSteps: ApprovalStep[];
  documents: ApprovalDocument[];
  formValue: VacationFormValue;
  uiFlags: {
    isFormSubmitting: boolean;
  };
}

export interface ToastMessagesStore {
  toastMessages: Map<string, ToastMessage>;
  timeOuts: Map<string, number>;
}
