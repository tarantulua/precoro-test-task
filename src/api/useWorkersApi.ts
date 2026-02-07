import axios from "axios";
import type { ApiResponse, ApiResponseWithPagination } from "../types/common";
import type { Data, User } from "../types/workers";
import type { FetchUserParams, VacationUpdateDto } from "../types/request";
import { useToastMessages } from "../composables/useToastMessages";

const BASE_URL = "https://precoro-vuejs-test-task-api.avramch.workers.dev";

export const useWorkersApi = () => {
  const { addToastMessage } = useToastMessages();

  const fetchData = async (): Promise<ApiResponse<Data> | null> => {
    try {
      const { data } = await axios.get<ApiResponse<Data>>(
        "https://precoro-vuejs-test-task-api.avramch.workers.dev/data",
      );

      if (!data?.ok) {
        throw new Error("Failed to fetch data");
      }

      return data;
    } catch {
      //TODO: Error message
      return null;
    }
  };

  const fetchUsers = async (
    params?: FetchUserParams,
  ): Promise<ApiResponseWithPagination<User[]> | null> => {
    try {
      const { data } = await axios.get<ApiResponseWithPagination<User[]>>(
        `${BASE_URL}/users`,
        {
          params,
        },
      );

      if (!data?.ok) {
        throw new Error("Failed to fetch users");
      }

      return data;
    } catch {
      //TODO: Error message
      return null;
    }
  };

  const updateVacation = async (dto: VacationUpdateDto) => {
    try {
      const { data } = await axios.patch<ApiResponse<never>>(
        `${BASE_URL}/update`,
        dto,
      );

      if (!data?.ok) {
        throw new Error("Failed to update vacation");
      }

      addToastMessage({
        title: "SUCCESS",
        text: "Updated successfully.",
        type: "success",
      });

      return true;
    } catch {
      return false;
    }
  };

  return {
    fetchData,
    fetchUsers,
    updateVacation,
  };
};
