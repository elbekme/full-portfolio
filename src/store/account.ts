import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";


import request from "../server";
import FormData from "../types/account";

interface AccountState {
  account: FormData[];
  loading: boolean;
  getAccount: () => void;
}


const useAccount = create<AccountState>()(

  devtools(
    immer((set) => ({
        account: [],
      loading: false,
      getAccount: async () => {
        try {
          set((state) => {
            state.loading = true;
          });
          const {
            data
          } = await request.get('auth/me');
          set((state) => {
            state.account = data;
            state.loading = false;
          });
        } finally {
          set((state) => {
            state.loading = false;
          });
        }
      },
    }))
  )
);

export default useAccount;