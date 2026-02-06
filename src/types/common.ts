export interface Pagination {
  total: number;
  count: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  ok: boolean;
  data: T;
}

export interface ApiResponseWithPagination<T> extends ApiResponse<T> {
  meta: {
    pagination: Pagination;
  };
}

export type Nullable<T> = T | null;

export interface UserSelectOption {
  label: string;
  value: number;
}
