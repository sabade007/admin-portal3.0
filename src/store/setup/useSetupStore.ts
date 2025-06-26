import { create } from "zustand";
import axios from "axios";
import { env } from "next-runtime-env";
import { addToast } from "@heroui/react";

interface SmtpData {
  smtpHost: string;
  smtpPort: string;
  smtpUsername: string;
  smtpPassword: string;
  smtpProtocol: string;
  smtpEnableSmtpAuth: boolean;
  smtpEnableStartTls: boolean;
}

interface SetupWizardData {
  [key: string]: any; // You can refine this if you have a specific structure
}

interface SetupStore {
  error: string | null;
  setError: (error: string | null) => void;

  getCaptcha: () => Promise<any | false>;

  currentTab: string;
  setCurrentTab: (tab: string) => void;

  disabledKeys: string[];
  setDisabledKeys: (keys: string[]) => void;

  organizationName: string;
  setOrganizationName: (name: string) => void;
  organizationNameError: boolean;
  setOrganizationNameError: (error: boolean) => void;

  organizationSize: string;
  setOrganizationSize: (size: string) => void;
  organizationSizeError: boolean;
  setOrganizationSizeError: (error: boolean) => void;

  organizationIndustry: string;
  setOrganizationIndustry: (industry: string) => void;
  organizationIndustryError: boolean;
  setOrganizationIndustryError: (error: boolean) => void;

  organizationType: string;
  setOrganizationType: (type: string) => void;
  organizationTypeError: boolean;
  setOrganizationTypeError: (error: boolean) => void;

  organizationLogo: string;
  setOrganizationLogo: (logo: string) => void;

  organizationTagline: string;
  setOrganizationTagline: (tagline: string) => void;

  contactName: string;
  setContactName: (name: string) => void;
  contactNameError: boolean;
  setContactNameError: (error: boolean) => void;

  contactWebsite: string;
  setContactWebsite: (website: string) => void;
  contactWebsiteError: boolean;
  setContactWebsiteError: (error: boolean) => void;

  contactPhone: string;
  setContactPhone: (phone: string) => void;
  contactPhoneError: boolean;
  setContactPhoneError: (error: boolean) => void;

  contactCountry: string;
  setContactCountry: (country: string) => void;
  contactCountryError: boolean;
  setContactCountryError: (error: boolean) => void;

  contactCountryCode: string;
  setContactCountryCode: (code: string) => void;

  adminName: string;
  setAdminName: (name: string) => void;
  adminNameError: boolean;
  setAdminNameError: (error: boolean) => void;

  adminEmail: string;
  setAdminEmail: (email: string) => void;
  adminEmailError: boolean;
  setAdminEmailError: (error: boolean) => void;

  adminPassword: string;
  setAdminPassword: (password: string) => void;
  adminPasswordError: boolean;
  setAdminPasswordError: (error: boolean) => void;

  adminRepeatPassword: string;
  setAdminRepeatPassword: (password: string) => void;
  adminRepeatPasswordError: boolean;
  setAdminRepeatPasswordError: (error: boolean) => void;

  smtpHost: string;
  setSmtpHost: (host: string) => void;
  smtpHostError: boolean;
  setSmtpHostError: (error: boolean) => void;

  smtpPort: string;
  setSmtpPort: (port: string) => void;
  smtpPortError: boolean;
  setSmtpPortError: (error: boolean) => void;

  smtpUsername: string;
  setSmtpUsername: (username: string) => void;
  smtpUsernameError: boolean;
  setSmtpUsernameError: (error: boolean) => void;

  smtpPassword: string;
  setSmtpPassword: (password: string) => void;
  smtpPasswordError: boolean;
  setSmtpPasswordError: (error: boolean) => void;

  smtpProtocol: string;
  setSmtpProtocol: (protocol: string) => void;
  smtpProtocolError: boolean;
  setSmtpProtocolError: (error: boolean) => void;

  smtpEnableSmtpAuth: boolean;
  setSmtpEnableSmtpAuth: (enable: boolean) => void;

  smtpEnableStartTls: boolean;
  setSmtpEnableStartTls: (enable: boolean) => void;

  smtpTestSuccessful: boolean;
  setSmtpTestSuccessful: (enable: boolean) => void;

  smtpLoading: boolean;
  setSmtpLoading: (enable: boolean) => void;

  testSmtpConnection: (data: any) => Promise<any | false>;

  selfRegistrationEnabled: boolean;
  setSelfRegistrationEnabled: (enable: boolean) => void;

  enableLdap: boolean;
  setEnableLdap: (enable: boolean) => void;

  enableOauth: boolean;
  setEnableOauth: (enable: boolean) => void;

  issuerUrl: string;
  setIssuerUrl: (url: string) => void;
  issuerUrlError: boolean;
  setIssuerUrlError: (error: boolean) => void;

  issuerClientId: string;
  setIssuerClientId: (clientId: string) => void;
  issuerClientIdError: boolean;
  setIssuerClientIdError: (error: boolean) => void;

  issuerClientSecret: string;
  setIssuerClientSecret: (clientSecret: string) => void;
  issuerClientSecretError: boolean;
  setIssuerClientSecretError: (error: boolean) => void;

  submitLoading: boolean;
  setSubmitLoading: (loading: boolean) => void;

  setupSuccessful: boolean;
  setSetupSuccessful: (enable: boolean) => void;

  submitSetupWizard: (data: SetupWizardData) => Promise<any | false>;

  reset: () => void;
}

const useSetupstore = create<SetupStore>((set) => ({
  error: null,
  setError: (error) => set({ error }),

  getCaptcha: async () => {
    set({ error: null });
    try {
      const response = await axios.get(
        env("NEXT_PUBLIC_BACKEND_URL") + "auth/getCaptcha"
      );
      return response.data;
    } catch (err: any) {
      set({ error: err.message });
      addToast({
        title: err.message,
        color: "danger",
      });
      return false;
    }
  },

  currentTab: "organization",
  setCurrentTab: (tab) => set({ currentTab: tab }),

  disabledKeys: ["contact", "admin", "smtp", "advanced", "apps"],
  setDisabledKeys: (keys) => set({ disabledKeys: keys }),

  organizationName: "",
  setOrganizationName: (name) => set({ organizationName: name }),
  organizationNameError: false,
  setOrganizationNameError: (error) => set({ organizationNameError: error }),

  organizationSize: "",
  setOrganizationSize: (size) => set({ organizationSize: size }),
  organizationSizeError: false,
  setOrganizationSizeError: (error) => set({ organizationSizeError: error }),

  organizationIndustry: "",
  setOrganizationIndustry: (industry) =>
    set({ organizationIndustry: industry }),
  organizationIndustryError: false,
  setOrganizationIndustryError: (error) =>
    set({ organizationIndustryError: error }),

  organizationType: "",
  setOrganizationType: (type) => set({ organizationType: type }),
  organizationTypeError: false,
  setOrganizationTypeError: (error) => set({ organizationTypeError: error }),

  organizationLogo: "",
  setOrganizationLogo: (logo) => set({ organizationLogo: logo }),

  organizationTagline: "",
  setOrganizationTagline: (tagline) => set({ organizationTagline: tagline }),

  contactName: "",
  setContactName: (name) => set({ contactName: name }),
  contactNameError: false,
  setContactNameError: (error) => set({ contactNameError: error }),

  contactWebsite: "",
  setContactWebsite: (website) => set({ contactWebsite: website }),
  contactWebsiteError: false,
  setContactWebsiteError: (error) => set({ contactWebsiteError: error }),

  contactPhone: "",
  setContactPhone: (phone) => set({ contactPhone: phone }),
  contactPhoneError: false,
  setContactPhoneError: (error) => set({ contactPhoneError: error }),

  contactCountry: "",
  setContactCountry: (country) => set({ contactCountry: country }),
  contactCountryError: false,
  setContactCountryError: (error) => set({ contactCountryError: error }),

  contactCountryCode: "",
  setContactCountryCode: (code) => set({ contactCountryCode: code }),

  adminName: "",
  setAdminName: (name) => set({ adminName: name }),
  adminNameError: false,
  setAdminNameError: (error) => set({ adminNameError: error }),

  adminEmail: "",
  setAdminEmail: (email) => set({ adminEmail: email }),
  adminEmailError: false,
  setAdminEmailError: (error) => set({ adminEmailError: error }),

  adminPassword: "",
  setAdminPassword: (password) => set({ adminPassword: password }),
  adminPasswordError: false,
  setAdminPasswordError: (error) => set({ adminPasswordError: error }),

  adminRepeatPassword: "",
  setAdminRepeatPassword: (password) => set({ adminRepeatPassword: password }),
  adminRepeatPasswordError: false,
  setAdminRepeatPasswordError: (error) =>
    set({ adminRepeatPasswordError: error }),

  smtpHost: "",
  setSmtpHost: (host) => set({ smtpHost: host }),
  smtpHostError: false,
  setSmtpHostError: (error) => set({ smtpHostError: error }),

  smtpPort: "",
  setSmtpPort: (port) => set({ smtpPort: port }),
  smtpPortError: false,
  setSmtpPortError: (error) => set({ smtpPortError: error }),

  smtpUsername: "",
  setSmtpUsername: (username) => set({ smtpUsername: username }),
  smtpUsernameError: false,
  setSmtpUsernameError: (error) => set({ smtpUsernameError: error }),

  smtpPassword: "",
  setSmtpPassword: (password) => set({ smtpPassword: password }),
  smtpPasswordError: false,
  setSmtpPasswordError: (error) => set({ smtpPasswordError: error }),

  smtpProtocol: "",
  setSmtpProtocol: (protocol) => set({ smtpProtocol: protocol }),
  smtpProtocolError: false,
  setSmtpProtocolError: (error) => set({ smtpProtocolError: error }),

  smtpEnableSmtpAuth: false,
  setSmtpEnableSmtpAuth: (enable) => set({ smtpEnableSmtpAuth: enable }),

  smtpEnableStartTls: false,
  setSmtpEnableStartTls: (enable) => set({ smtpEnableStartTls: enable }),

  smtpTestSuccessful: false,
  setSmtpTestSuccessful: (enable) => set({ smtpTestSuccessful: enable }),

  smtpLoading: false,
  setSmtpLoading: (enable) => set({ smtpLoading: enable }),

  testSmtpConnection: async (data) => {
    try {
      const response = await axios.post(
        env("NEXT_PUBLIC_BACKEND_URL") + "settings/testMailConfig",
        { ...data }
      );
      return response.data;
    } catch (err: any) {
      addToast({
        title: err.message,
        color: "danger",
      });
      return false;
    }
  },

  selfRegistrationEnabled: false,
  setSelfRegistrationEnabled: (enable) =>
    set({ selfRegistrationEnabled: enable }),

  enableLdap: false,
  setEnableLdap: (enable) => set({ enableLdap: enable }),

  enableOauth: false,
  setEnableOauth: (enable) => set({ enableOauth: enable }),

  issuerUrl: "",
  setIssuerUrl: (url) => set({ issuerUrl: url }),
  issuerUrlError: false,
  setIssuerUrlError: (error) => set({ issuerUrlError: error }),

  issuerClientId: "",
  setIssuerClientId: (clientId) => set({ issuerClientId: clientId }),
  issuerClientIdError: false,
  setIssuerClientIdError: (error) => set({ issuerClientIdError: error }),

  issuerClientSecret: "",
  setIssuerClientSecret: (clientSecret) =>
    set({ issuerClientSecret: clientSecret }),
  issuerClientSecretError: false,
  setIssuerClientSecretError: (error) =>
    set({ issuerClientSecretError: error }),

  submitLoading: false,
  setSubmitLoading: (loading) => set({ submitLoading: loading }),

  setupSuccessful: false,
  setSetupSuccessful: (enable) => set({ setupSuccessful: enable }),

  submitSetupWizard: async (data) => {
    try {
      const response = await axios.post(
        env("NEXT_PUBLIC_BACKEND_URL") + "auth/setup-wizard",
        { ...data }
      );
      return response.data;
    } catch (err: any) {
      addToast({
        title: err.message,
        color: "danger",
      });
      return false;
    }
  },

  reset: () =>
    set({
      organizationIndustry: "",
      organizationName: "",
      organizationType: "",
      organizationSize: "",
      adminEmailError: false,
      adminPasswordError: false,
      adminRepeatPasswordError: false,
      smtpHostError: false,
      smtpPortError: false,
      smtpUsernameError: false,
      smtpPasswordError: false,
      smtpProtocolError: false,
      contactNameError: false,
      contactPhoneError: false,
      contactWebsiteError: false,
      adminEmail: "",
      adminPassword: "",
      adminRepeatPassword: "",
      smtpHost: "",
      smtpPort: "",
      smtpUsername: "",
      smtpPassword: "",
      smtpProtocol: "",
      smtpEnableSmtpAuth: false,
      smtpEnableStartTls: false,
      smtpTestSuccessful: false,
      smtpLoading: false,
      selfRegistrationEnabled: false,
      enableLdap: false,
      enableOauth: false,
      issuerUrl: "",
      issuerClientId: "",
      issuerClientSecret: "",
      setupSuccessful: false,
      contactName: "",
      contactPhone: "",
      contactWebsite: "",
      contactCountry: "",

      contactCountryError: false,
    }),
}));

export default useSetupstore;
