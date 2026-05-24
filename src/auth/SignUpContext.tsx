import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

export type SignUpData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  university: string;
  faculty: string;
  department: string;
  gender: string;
  religion: string;
  dateOfBirth: string;
  level: string;
};

type SignUpUpdate = Partial<SignUpData>;

type SignUpContextValue = {
  signUpData: SignUpData;
  updateSignUpData: (data: SignUpUpdate) => void;
  resetSignUpData: () => void;
  submitSignUp: () => Promise<void>;
};

const STORAGE_KEY = 'varsigram-campus-signup';

const initialState: SignUpData = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  university: '',
  faculty: '',
  department: '',
  gender: '',
  religion: '',
  dateOfBirth: '',
  level: '',
};

const SignUpContext = createContext<SignUpContextValue | undefined>(undefined);

export const SignUpProvider = ({ children }: { children: ReactNode }) => {
  const [signUpData, setSignUpData] = useState<SignUpData>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? { ...initialState, ...JSON.parse(saved) } : initialState;
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      return initialState;
    }
  });

  const updateSignUpData = useCallback((data: SignUpUpdate) => {
    setSignUpData((current) => {
      const next = { ...current, ...data };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetSignUpData = useCallback(() => {
    setSignUpData(initialState);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const submitSignUp = useCallback(async () => {
    window.localStorage.setItem('varsigram-campus-user', JSON.stringify(signUpData));
  }, [signUpData]);

  const value = useMemo(
    () => ({ signUpData, updateSignUpData, resetSignUpData, submitSignUp }),
    [signUpData, updateSignUpData, resetSignUpData, submitSignUp],
  );

  return <SignUpContext.Provider value={value}>{children}</SignUpContext.Provider>;
};

export const useSignUp = () => {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error('useSignUp must be used within a SignUpProvider');
  }
  return context;
};