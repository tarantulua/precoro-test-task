import { storeToRefs } from "pinia";
import { useUsersStore } from "../store/useUsesrStore";

export const useUsers = () => {
  const store = useUsersStore();
  const { getUsers, getPagination } = storeToRefs(store);

  return {
    users: getUsers,
    pagination: getPagination,
    fetchUsers: store.fetchUsers,
  };
};
