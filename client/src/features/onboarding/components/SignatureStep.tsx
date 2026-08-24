import { PenTool } from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { OnboardingFormValues } from "../schemas/onboarding.schema";
import { Input } from "../../../shared/components/ui/Form/Inputs";
import { FormField } from "../../../shared/components/ui/Form/FormField";

interface SignatureStepProps {
  register: UseFormRegister<OnboardingFormValues>;
  errors: FieldErrors<OnboardingFormValues>;
}

export function SignatureStep({
  register,
  errors,
}: SignatureStepProps) {
  const signatureError = errors.signature?.message;

  return (
    <div className="space-y-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-primary/20 p-2 text-primary">
          <PenTool size={24} />
        </div>

        <h2 className="text-2xl font-bold">
          Digital Signature
        </h2>
      </div>

      <p className="text-sm text-slate-400">
        By typing your full name below, you electronically sign and agree
        to the terms and conditions of your onboarding application.
      </p>

      <FormField
        label="Type full name to sign"
        error={signatureError?.toString()}
      >
        <Input
          {...register("signature")}
          error={!!errors.signature}
          className="font-serif text-lg italic"
          placeholder="Your Signature"
        />
      </FormField>
    </div>
  );
}