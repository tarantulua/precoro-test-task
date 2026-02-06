import { useWorkersApi } from "@/api/useWorkersApi";
import type { Pagination } from "@/types/common";
import type { FetchUserParams } from "@/types/request";
import type { UsersStore } from "@/types/store";
import type { User } from "@/types/workers";
import { defineStore } from "pinia";

export const useUsersStore = defineStore("user", {
  state: (): UsersStore => ({
    users: [],
    pagination: null,
  }),

  getters: {
    getUsers(state): User[] {
      return state.users;
    },

    getPagination(state): Pagination | null {
      return state.pagination;
    },
  },

  actions: {
    async fetchUsers(params?: FetchUserParams) {
      const { fetchUsers } = useWorkersApi();
      const users = await fetchUsers(params);
      if (!users) {
        return;
      }

      this.users = users.data;
      this.pagination = users.meta.pagination;
    },
  },
});
