import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { FormInstance } from "antd";

import request from "../server";
import User from "../types/user";
import { USER } from "../constants";
import Experience from "../types/experience";

interface ExperienceState {
  user: null | User;
  experiences: Experience[];
  loading: boolean;
  total: number;
  page: number;
  isModalOpen: boolean;
  modalLoading: boolean;
  selected: null | string;
  search: string;
  getExperiences: () => void;
  setPage: (page: number) => void;
  controlModal: (data: boolean) => void;
  setModalLoading: (data: boolean) => void;
  showModal: (form: FormInstance) => void;
  setUser: (user: User) => void;
  setSelected: (selected: null | string) => void;
  setSearch: (search: string) => void;
}
const userId = localStorage.getItem("PORTFOLIO_USER")
  ? JSON.parse(localStorage.getItem("PORTFOLIO_USER") || "")
  : null;

const useExperience = create<ExperienceState>()(
  devtools(
    immer((set, get) => ({
      user: localStorage.getItem(USER)
        ? JSON.parse(localStorage.getItem(USER) || "")
        : null,
      experiences: [],
      loading: false,
      isModalOpen: false,
      modalLoading: false,
      selected: null,
      total: 0,
      page: 1,
      search: "",
      setSearch: (search) => {
        // set((state) => ({ ...state, search }));
        set((state) => {
          state.search = search;
        });
        get().getExperiences();
      },
      getExperiences: async () => {
        try {
          // set((state) => ({ ...state, loading: true }));
          set((state) => {
            state.loading = true;
          });

          const {
            data: { pagination, data },
          } = await request.get("experiences", {
            params: {
              page: get().page,
              // limit: LIMIT,
              search: get().search,
              user: userId?._id,          
            },
          });
          // set((state) => ({
          //   ...state,
          //   skills: data,
          //   total: pagination.total,
          //   loading: false,
          // }));
          set((state) => {
            state.experiences = data;
            state.total = pagination.total;
            state.loading = false;
          });
        } finally {
          // set((state) => ({ ...state, loading: false }));
          set((state) => {
            state.loading = false;
          });
        }
      },
      setPage: (page) => {
        // set((state) => ({ ...state, page })); 
        set((state) => {
          state.page = page;
        });
        get().getExperiences();
      },
      controlModal: (data) => {
        // set((state) => ({ ...state, isModalOpen: data }));
        set((state) => {
          state.isModalOpen = data;
        });
      },
      setModalLoading: (data) => {
        // set((state) => ({ ...state, modalLoading: data }));
        set((state) => {
          state.modalLoading = data;
        });
      },
      showModal: (form) => {
        get().controlModal(true);
        get().setSelected(null);
        form.resetFields();
      },
      setUser: (user) => {
        // set((state) => ({ ...state, user }));
        set((state) => {
          state.user = user;
        });
      },
      setSelected: (selected) => {
        // set((state) => ({ ...state, selected }));
        set((state) => {
          state.selected = selected;
        });
      },
    }))
  )
);

export default useExperience;
