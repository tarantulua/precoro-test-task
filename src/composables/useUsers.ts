import { useUsersStore } from "@/store/useUsersStore";
import { storeToRefs } from "pinia";

export const useUsers = () => {
  const store = useUsersStore();
  const { getUsers, getPagination } = storeToRefs(store);

  return {
    users: getUsers,
    pagination: getPagination,
    fetchUsers: store.fetchUsers,
  };
};
