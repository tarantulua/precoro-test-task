import { defineStore } from "pinia";
import type { ToastMessagesStore } from "../types/store";
import type { ToastMessage } from "../types/components";

const DEFAULT_TOAST_DURATION = 5000;
const DEFAULT_TOAST_TYPE = "success";

export const useToastMessagesStore = defineStore("toastMessages", {
  state: (): ToastMessagesStore => ({
    toastMessages: new Map(),
    timeOuts: new Map<string, number>(),
  }),

  getters: {
    getToastMessages(state) {
      return Array.from(state.toastMessages.values());
    },
  },

  actions: {
    addToastMessage(toastMessage: Omit<ToastMessage, "id">) {
      const newToastMessage: ToastMessage = {
        id: crypto.randomUUID(),
        ...toastMessage,
      };

      newToastMessage.duration ??= DEFAULT_TOAST_DURATION;
      newToastMessage.type ??= DEFAULT_TOAST_TYPE;

      this.toastMessages.set(newToastMessage.id, newToastMessage);

      const timeout = setTimeout(
        () => this.removeToastMessage(newToastMessage.id),
        newToastMessage.duration,
      );

      this.timeOuts.set(newToastMessage.id, timeout);
    },

    removeToastMessage(id: string) {
      const timeout = this.timeOuts.get(id);

      if (timeout) {
        clearTimeout(timeout);
        this.timeOuts.delete(id);
      }

      this.toastMessages.delete(id);
    },
  },
});
