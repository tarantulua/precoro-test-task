import { useToastMessagesStore } from "@/store/useToastMessagesStore";
import { storeToRefs } from "pinia";

export const useToastMessages = () => {
  const store = useToastMessagesStore();

  const { getToastMessages } = storeToRefs(store);

  return {
    toastMessages: getToastMessages,
    addToastMessage: store.addToastMessage,
    removeToastMessage: store.removeToastMessage,
  };
};
