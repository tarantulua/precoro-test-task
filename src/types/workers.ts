import type { Nullable } from "./common";

export interface ApprovalStep {
  id: number;
  documentId: number;
  stepNumber: number;
  stepName: string; // enum?
}

export interface ApprovalDocument {
  id: number;
  name: string; // enum?
}

export interface User {
  id: number;
  email: string;
  fullName: string;
}

export type UserWithoutFullname = Omit<User, "fullName">;

export interface Data {
  approvalSteps: ApprovalStep[];
  documents: ApprovalDocument[];
}

export interface DocumentApprovalData extends ApprovalDocument {
  approvalSteps: ApprovalStep[];
}

export interface VacationMode {
  enable: boolean;
  startDate: Nullable<number>;
  endDate: Nullable<number>;
}

export interface BackupApprover {
  id: number;
  backupApproverId: Nullable<number>;
  backupApproverEmail?: string;
}

export type BackupApprovers = Record<number, Nullable<UserWithoutFullname>>;
