import { useState } from 'react';
import {
  CheckCircle2,
  CreditCard,
  FileText,
  Loader2,
  PenTool,
  User,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { CONTRACTOR_TYPES } from '../types/onboarding.types';
import { useOnboardingSteps } from '../hooks/useOnboardingSteps';
import { useOnboardingForm } from '../hooks/useOnboardingForm';

export default function OnboardingFlowPage() {
  const navigate = useNavigate();

  const {
    step,
    nextStep,
    prevStep,
    goToDoneStep,
    isFirstStep,
    isLastFormStep,
    isDone,
    totalSteps,
  } = useOnboardingSteps();

  const {
    register,
    handleSubmit,
    watch,
    isLoading,
    onSubmit,
    trigger,
    formState: { errors },
  } = useOnboardingForm({
    onSuccess: goToDoneStep,
  });

  const contractorType = watch('contractorType');
  const [globalDocType, setGlobalDocType] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<{ file: File; type: string }[]>([]);

  // Function to validate steps before proceeding
  const handleContinue = async () => {
    let fieldsToValidate: any[] = [];
    
    if (step === 1) fieldsToValidate = ['contractorType'];
    if (step === 2) fieldsToValidate = ['fullName', 'phone', 'address'];
    if (step === 3) fieldsToValidate = ['accountHolderName', 'bankName', 'accountNumber', 'ifscCode'];
    
    if (step === 4) {
      // Validate documents
      if (uploadedFiles.length === 0) {
        toast.error('Please upload at least one document.');
        return;
      }
      if (uploadedFiles.some(f => !f.type)) {
        toast.error('Please select a document type for all uploaded files.');
        return;
      }
      nextStep();
      return;
    }

    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) {
      nextStep();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      
      const validFiles: { file: File; type: string }[] = [];
      
      for (const file of newFiles) {
        if (uploadedFiles.length + validFiles.length >= 2) {
          toast.error('Maximum 2 documents can be uploaded.');
          break;
        }
        
        if (!allowedMimeTypes.includes(file.type)) {
          toast.error(`Unsupported file type: ${file.name}. Please upload PDF, JPG/JPEG or PNG.`);
          continue;
        }

        if (file.size > 2 * 1024 * 1024) {
          toast.error(`File ${file.name} is too large. Each document must be smaller than 2 MB.`);
          continue;
        }
        
        // Check for duplicates
        if (uploadedFiles.some(f => f.file.name === file.name)) {
          toast.error(`File ${file.name} is already selected.`);
          continue;
        }
        validFiles.push({ file, type: globalDocType });
      }

      setUploadedFiles((prev) => [...prev, ...validFiles]);
      // Reset input so the same file can be selected again if removed
      e.target.value = '';
    }
  };

  const finalSubmit = (data: any) => {
    const files = uploadedFiles.map(f => f.file);
    const metadata = uploadedFiles.map(f => ({ fileName: f.file.name, type: f.type }));
    onSubmit(data, files, metadata);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center pt-10">
      {/* Progress Bar */}
      {!isDone && (
        <div className="w-full max-w-2xl mb-8 flex items-center justify-between relative px-2">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -z-10 -translate-y-1/2 rounded" />

          <div
            className="absolute top-1/2 left-0 h-1 bg-primary -z-10 -translate-y-1/2 rounded transition-all duration-300"
            style={{
              width: `${((step - 1) / 4) * 100}%`,
            }}
          />

          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;

            return (
              <div
                key={stepNumber}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  step >= stepNumber
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {step > stepNumber ? (
                  <CheckCircle2 size={16} />
                ) : (
                  stepNumber
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="glass-panel w-full max-w-2xl p-8 rounded-2xl">
        <form onSubmit={handleSubmit(finalSubmit)}>
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">
                  Welcome to Tendagon!
                </h2>

                <p className="text-slate-400">
                  Let's get you set up. What is your role
                  on the team?
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {CONTRACTOR_TYPES.map((type) => (
                  <label
                    key={type}
                    className={`border rounded-xl p-4 cursor-pointer transition-all flex items-center justify-center text-center font-medium ${
                      contractorType === type
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-slate-700 bg-slate-800/50 hover:bg-slate-800'
                    }`}
                  >
                    <input
                      type="radio"
                      value={type}
                      {...register('contractorType')}
                      className="hidden"
                    />
                    {type.replace(/_/g, ' ')}
                  </label>
                ))}
              </div>
              {errors.contractorType && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.contractorType.message}
                </p>
              )}
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/20 text-primary rounded-lg">
                  <User size={24} />
                </div>
                <h2 className="text-2xl font-bold">
                  Your Information
                </h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  {...register('fullName')}
                  className={`input-field ${errors.fullName ? 'border-red-500' : ''}`}
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Phone Number
                </label>
                <input
                  {...register('phone')}
                  className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder="+91 9876543210"
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Address
                </label>
                <textarea
                  {...register('address')}
                  className={`input-field min-h-[100px] ${errors.address ? 'border-red-500' : ''}`}
                  placeholder="Your full address..."
                />
                {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/20 text-primary rounded-lg">
                  <CreditCard size={24} />
                </div>
                <h2 className="text-2xl font-bold">
                  Financial Details
                </h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Account Holder Name
                </label>
                <input
                  {...register('accountHolderName')}
                  className={`input-field ${errors.accountHolderName ? 'border-red-500' : ''}`}
                />
                {errors.accountHolderName && <p className="text-red-400 text-sm mt-1">{errors.accountHolderName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Bank Name
                </label>
                <input
                  {...register('bankName')}
                  className={`input-field ${errors.bankName ? 'border-red-500' : ''}`}
                />
                {errors.bankName && <p className="text-red-400 text-sm mt-1">{errors.bankName.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Account Number
                  </label>
                  <input
                    type="password"
                    {...register('accountNumber')}
                    className={`input-field ${errors.accountNumber ? 'border-red-500' : ''}`}
                  />
                  {errors.accountNumber && <p className="text-red-400 text-sm mt-1">{errors.accountNumber.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    IFSC Code
                  </label>
                  <input
                    {...register('ifscCode')}
                    className={`input-field uppercase ${errors.ifscCode ? 'border-red-500' : ''}`}
                    placeholder="HDFC0001234"
                  />
                  {errors.ifscCode && <p className="text-red-400 text-sm mt-1">{errors.ifscCode.message}</p>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/20 text-primary rounded-lg">
                  <FileText size={24} />
                </div>
                <h2 className="text-2xl font-bold">
                  Documents
                </h2>
              </div>

              <div className="p-6 border-2 border-dashed border-slate-700 rounded-xl text-center bg-slate-800/30">
                <div className="mb-6 max-w-sm mx-auto text-left">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    1. Select Document Type
                  </label>
                  <select 
                    className="w-full bg-slate-900 border border-slate-700 text-sm rounded-lg px-3 py-2 outline-none focus:border-primary transition-colors"
                    value={globalDocType}
                    onChange={(e) => setGlobalDocType(e.target.value)}
                  >
                    <option value="" disabled>Select Type...</option>
                    <option value="AADHAAR">Aadhaar (Front & Back)</option>
                    <option value="PASSPORT">Passport</option>
                    <option value="DRIVING_LICENSE">Driving License</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div className={`transition-opacity duration-300 ${!globalDocType ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                  <FileText className="mx-auto text-slate-500 mb-2" size={32} />
                  <p className="text-sm text-slate-300 mb-1">
                    2. Upload your {globalDocType ? globalDocType.replace('_', ' ') : 'document'} here.
                  </p>
                  <p className="text-xs text-slate-500 mb-4">
                    Maximum 2 documents. Each file must be under 2 MB. <br /> Accepted formats: PDF, JPG/JPEG, PNG
                  </p>

                  <input
                    type="file"
                    id="document-upload"
                    className="hidden"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                    onChange={handleFileUpload}
                    disabled={uploadedFiles.length >= 2 || !globalDocType}
                  />
                  
                  <label
                    htmlFor="document-upload"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-block ${
                      uploadedFiles.length >= 2 || !globalDocType
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                        : 'bg-slate-700 hover:bg-slate-600 text-white cursor-pointer'
                    }`}
                  >
                    Browse Files
                  </label>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-8 text-left">
                    <p className="text-sm font-medium text-slate-300 mb-2">Selected Files:</p>
                    <ul className="space-y-3">
                      {uploadedFiles.map((fileObj, idx) => (
                        <li key={idx} className="flex items-center justify-between bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                          <div className="flex flex-col gap-1 w-full max-w-[200px] sm:max-w-[300px]">
                            <span className="truncate text-sm font-medium text-slate-200">{fileObj.file.name}</span>
                            <span className="text-xs text-slate-400">
                              {(fileObj.file.size / (1024 * 1024)).toFixed(2)} MB • <span className="text-primary font-medium">{fileObj.type.replace('_', ' ')}</span>
                            </span>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => setUploadedFiles((prev) => prev.filter((_, i) => i !== idx))}
                            className="text-red-400 hover:text-red-300 text-sm font-medium px-3 py-1 bg-red-400/10 rounded hover:bg-red-400/20 transition-colors"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/20 text-primary rounded-lg">
                  <PenTool size={24} />
                </div>
                <h2 className="text-2xl font-bold">
                  Digital Signature
                </h2>
              </div>

              <p className="text-slate-400 text-sm">
                By typing your full name below, you
                electronically sign and agree to the terms
                and conditions of your onboarding application.
              </p>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Type full name to sign
                </label>
                <input
                  {...register('signature')}
                  className={`input-field font-serif text-lg italic ${errors.signature ? 'border-red-500' : ''}`}
                  placeholder="Your Signature"
                />
                {errors.signature && <p className="text-red-400 text-sm mt-1">{errors.signature.message}</p>}
              </div>
            </div>
          )}

          {/* STEP 6 */}
          {step === 6 && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 text-green-400 mb-6">
                <CheckCircle2 size={40} />
              </div>

              <h2 className="text-3xl font-bold mb-4">
                You're all set!
              </h2>

              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                Your onboarding application has been
                successfully submitted. We will notify you
                once an administrator reviews it.
              </p>

              <button
                type="button"
                onClick={() => navigate('/onboarding/status')}
                className="btn-primary"
              >
                Go to Status Page
              </button>
            </div>
          )}

          {/* NAVIGATION */}
          {!isDone && (
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-700/50">
              <button
                type="button"
                onClick={prevStep}
                disabled={isFirstStep || isLoading}
                className="px-6 py-2 rounded-lg font-medium text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-all"
              >
                Back
              </button>

              <button
                type={isLastFormStep ? 'submit' : 'button'}
                onClick={isLastFormStep ? undefined : handleContinue}
                disabled={isLoading}
                className="btn-primary"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : isLastFormStep ? (
                  'Submit Application'
                ) : (
                  'Continue'
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}