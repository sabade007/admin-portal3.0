import axiosInstance from "@/hooks/axios";
import { addToast } from "@heroui/react";
import { env } from "next-runtime-env";
import { create } from "zustand";
import qs from "qs";

interface RbacState {
  allRoles: any[];
  setAllRoles: (allRoles: any) => void;

  newRoleName: string;
  setNewRoleName: (newRoleName: string) => void;
  newRoleNameError: boolean;
  setNewRoleNameError: (newRoleNameError: boolean) => void;

  addUsersList: any[];
  setAddUsersList: (addUsersList: any) => void;

  removeUsersList: any[];
  setRemoveUsersList: (removeUsersList: any) => void;

  allApplications: any[];
  setAllApplications: (allApplications: any) => void;

  getallRoles: (orgId: any) => Promise<any>;

  createNewRole: (roleName: any, orgId: any) => Promise<any>;

  deleteRoles: (roleIds: any, orgId: any) => Promise<any>;

  getuserslists: (roleId: any, roleName: any) => Promise<any>;

  addUserstoRoles: (body: any) => Promise<any>;

  removeUsersfromRoles: (body: any) => Promise<any>;

  getAllApplications: (orgId: any) => Promise<any>;

  getAllrolesforApplication: (applicationId: any) => Promise<any>;

  createnewApplication: (body: any, orgId: any) => Promise<any>;

  deleteApplications: (applicationIds: any) => Promise<any>;

  editApplications: (body: any) => Promise<any>;
}

const useRbacStore = create<RbacState>((set) => ({
  allRoles: [],
  setAllRoles: (allRoles) => set({ allRoles }),

  newRoleName: "",
  setNewRoleName: (newRoleName) => set({ newRoleName }),

  newRoleNameError: false,
  setNewRoleNameError: (newRoleNameError) => set({ newRoleNameError }),

  addUsersList: [],
  setAddUsersList: (addUsersList) => set({ addUsersList }),

  removeUsersList: [],
  setRemoveUsersList: (removeUsersList) => set({ removeUsersList }),

  ////////Applications

  allApplications: [],
  setAllApplications: (allApplications) => set({ allApplications }),

  /////////////Roles

  getallRoles: async (orgId) => {
    try {
      const response = await axiosInstance.get(
        env("NEXT_PUBLIC_BACKEND_URL") + `portal/getroles/${orgId}`
      );
      const data = response.data;
      set({ allRoles: data });
      return data;
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  },

  createNewRole: async (roleName, orgId) => {
    try {
      const response = await axiosInstance.post(
        env("NEXT_PUBLIC_BACKEND_URL") +
          `portal/createrole/${orgId}?roleName=${encodeURIComponent(roleName)}`
      );
      const data = response.data;
      return data;
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  },

  deleteRoles: async (roleIds) => {
    try {
      const response = await axiosInstance.delete(
        env("NEXT_PUBLIC_BACKEND_URL") + `portal/deleteroles`,
        {
          params: {
            roleIds: roleIds,
          },
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: "repeat" });
          },
        }
      );
      return response.data;
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  },

  getuserslists: async (roleId, roleName) => {
    try {
      const response = await axiosInstance.post(
        env("NEXT_PUBLIC_BACKEND_URL") + `portal/getuserlist/${roleId}`
      );
      const data = response.data;

      set({
        addUsersList: data.OtherRole || [],
        removeUsersList: data[roleName] || [],
      });

      return data;
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  },
  addUserstoRoles: async (body) => {
    try {
      const response = await axiosInstance.post(
        env("NEXT_PUBLIC_BACKEND_URL") + `portal/adduserstorole`,
        body
      );
      const data = response.data;
      return data;
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  },

  removeUsersfromRoles: async (body) => {
    try {
      const response = await axiosInstance.post(
        env("NEXT_PUBLIC_BACKEND_URL") + `portal/removeuserfromrole`,
        body
      );
      const data = response.data;
      return data;
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  },

  //////////////Applications

  getAllApplications: async (orgId) => {
    try {
      const response = await axiosInstance.get(
        env("NEXT_PUBLIC_BACKEND_URL") + `portal/getapplication/${orgId}`
      );
      const data = response.data;
      set({ allApplications: data });
      return data;
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  },

  getAllrolesforApplication: async (applicationId) => {
    try {
      const response = await axiosInstance.post(
        env("NEXT_PUBLIC_BACKEND_URL") +
          `portal/getallrolesforapplication/${applicationId}`
      );
      const data = response.data;
      return data;
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  },

  createnewApplication: async (body, orgId) => {
    try {
      const response = await axiosInstance.post(
        env("NEXT_PUBLIC_BACKEND_URL") +
          `portal/createapplication/${orgId}?isVdiApplication=true`,
        body
      );
      const data = response.data;
      return data;
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  },

  deleteApplications: async (applicationIds) => {
    try {
      const response = await axiosInstance.delete(
        env("NEXT_PUBLIC_BACKEND_URL") + `portal/deleteapplications`,
        {
          params: {
            applicationIds: applicationIds,
          },
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: "repeat" });
          },
        }
      );
      return response.data;
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  },

  editApplications: async (body) => {
    try {
      const response = await axiosInstance.put(
        env("NEXT_PUBLIC_BACKEND_URL") +
          `portal/editapplication/${body.applicationId}`,
        body
      );
      const data = response.data;
      return data;
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  },
}));

export default useRbacStore;
