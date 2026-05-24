import { useState } from 'react';
import { ProgressBar } from '../components/ProgressBar';
import { SignUpForm } from './SignUpForm';
import { AcademicDetails } from './AcademicDetails';
import { AcademicLevel } from './AcademicLevel';
import { EmailVerification } from './EmailVerification';

type MultiStepSignUpProps = {
  onExitToWelcome: () => void;
  onLogin: () => void;
  onComplete: () => void;
};

const TOTAL_STEPS = 4;

export const MultiStepSignUp = ({ onExitToWelcome, onLogin, onComplete }: MultiStepSignUpProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((step) => step + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((step) => step - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SignUpForm onNext={handleNext} onLogin={onLogin} onBackToWelcome={onExitToWelcome} />;
      case 2:
        return <AcademicDetails onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <AcademicLevel onBack={handleBack} onNext={handleNext} />;
      case 4:
        return <EmailVerification onBack={handleBack} onComplete={onComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f2f3]">
      <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
      <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">{renderStep()}</div>
    </div>
  );
};