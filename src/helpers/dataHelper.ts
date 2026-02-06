import type { Nullable } from "@/types/common";
import type { VacationUpdateDto } from "@/types/request";
import type { VacationFormValue } from "@/types/store";
import type { ApprovalDocument, ApprovalStep } from "@/types/workers";

export const mapDocumentsData = (
  approvalSteps: ApprovalStep[],
  documents: ApprovalDocument[],
) => {
  const approvalStepMap: Record<number, ApprovalStep[]> = approvalSteps.reduce(
    (acc, value) => {
      const newValue = { ...acc };
      newValue[value.documentId] ??= [];
      (newValue[value.documentId] as ApprovalStep[]).push(value);
      return newValue;
    },
    {} as Record<number, ApprovalStep[]>,
  );

  return documents.map((value) => ({
    ...value,
    approvalSteps: approvalStepMap[value.id] ?? [],
  }));
};

export const convertVacationFormValueToDto = (
  fromValue: VacationFormValue,
): Nullable<VacationUpdateDto> => {
  try {
    const { backupApprovers, substituteUser, vacationMode } = fromValue;

    if (
      !vacationMode.endDate ||
      !vacationMode.startDate ||
      !substituteUser?.id
    ) {
      return null;
    }

    const entries = Object.entries(backupApprovers);

    if (entries.some((entry) => !entry[1]?.id)) {
      return null;
    }

    const approversArray = entries.reduce(
      (acc, entry) => {
        const [key, value] = entry;

        return [
          ...acc,
          { id: Number.parseInt(key), backupApproverId: value?.id! },
        ];
      },
      [] as { id: number; backupApproverId: number }[],
    );

    const dto: VacationUpdateDto = {
      vacationMode: {
        enable: true,
        startDate: Math.floor(vacationMode.startDate / 1000),
        endDate: Math.floor(vacationMode.endDate / 1000),
      },
      substituteUser: substituteUser.id,
      backupApprovers: approversArray,
    };

    return dto;
  } catch {
    return null;
  }
};
