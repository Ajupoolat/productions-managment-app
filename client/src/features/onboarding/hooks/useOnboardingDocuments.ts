import { useState } from 'react';
import { toast } from 'sonner';
import { MAX_DOCUMENTS,MAX_FILE_SIZE,ALLOWED_MIME_TYPES } from '../../../constants/file-roles';
import type { UploadedDocument } from '../types/uploadDocuments.types';


export function useOnboardingDocuments() {
  const [documentType, setDocumentType] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<
    UploadedDocument[]
  >([]);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const newFiles = Array.from(event.target.files);
    const validFiles: UploadedDocument[] = [];

    for (const file of newFiles) {
      if (
        uploadedFiles.length + validFiles.length >=
        MAX_DOCUMENTS
      ) {
        toast.error(
          'Maximum 2 documents can be uploaded.'
        );
        break;
      }

      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        toast.error(
          `Unsupported file type: ${file.name}. Please upload PDF, JPG/JPEG or PNG.`
        );
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(
          `File ${file.name} is too large. Each document must be smaller than 2 MB.`
        );
        continue;
      }

      if (
        uploadedFiles.some(
          (uploaded) =>
            uploaded.file.name === file.name
        )
      ) {
        toast.error(
          `File ${file.name} is already selected.`
        );
        continue;
      }

      validFiles.push({
        file,
        type: documentType,
      });
    }

    setUploadedFiles((previous) => [
      ...previous,
      ...validFiles,
    ]);

    // Allows selecting the same file again after removal.
    event.target.value = '';
  };

  const removeFile = (index: number) => {
    setUploadedFiles((previous) =>
      previous.filter((_, currentIndex) => currentIndex !== index)
    );
  };

  const validateDocuments = () => {
    if (uploadedFiles.length === 0) {
      toast.error(
        'Please upload at least one document.'
      );
      return false;
    }

    if (uploadedFiles.some((file) => !file.type)) {
      toast.error(
        'Please select a document type for all uploaded files.'
      );
      return false;
    }

    return true;
  };

  const getFiles = () =>
    uploadedFiles.map((document) => document.file);

  const getMetadata = () =>
    uploadedFiles.map((document) => ({
      fileName: document.file.name,
      type: document.type,
    }));

  return {
    documentType,
    setDocumentType,

    uploadedFiles,

    handleFileUpload,
    removeFile,
    validateDocuments,

    getFiles,
    getMetadata,
  };
}