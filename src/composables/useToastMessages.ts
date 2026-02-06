import { storeToRefs } from "pinia";
import { useToastMessagesStore } from "../store/useToastMessagesStore";

export const useToastMessages = () => {
  const store = useToastMessagesStore();

  const { getToastMessages } = storeToRefs(store);

  return {
    toastMessages: getToastMessages,
    addToastMessage: store.addToastMessage,
    removeToastMessage: store.removeToastMessage,
  };
};
