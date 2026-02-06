export interface FetchUserParams {
  search?: string;
  page?: number;
}

export interface VacationUpdateDto {
  vacationMode: {
    enable: boolean;
    startDate: number;
    endDate: number;
  };
  substituteUser: number;
  backupApprovers: { id: number; backupApproverId: number }[];
}
