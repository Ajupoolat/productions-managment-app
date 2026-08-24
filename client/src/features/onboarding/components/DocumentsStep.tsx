import { FileText } from 'lucide-react';
import type { UploadedDocument } from '../types/uploadDocuments.types';
import { FormField } from '../../../shared/components/ui/Form/FormField';
import { Select } from '../../../shared/components/ui/Form/Select';

interface DocumentsStepProps {
  documentType: string;
  uploadedFiles: UploadedDocument[];
  onDocumentTypeChange: (
    value: string
  ) => void;
  onFileUpload: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onRemoveFile: (index: number) => void;
}

export function DocumentsStep({
  documentType,
  uploadedFiles,
  onDocumentTypeChange,
  onFileUpload,
  onRemoveFile,
}: DocumentsStepProps) {
  return (
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
          <FormField label="1. Select Document Type">
            <Select
              value={documentType}
              onChange={(event) =>
                onDocumentTypeChange(
                  event.target.value
                )
              }
            >
              <option value="" disabled>
                Select Type...
              </option>

              <option value="AADHAAR">
                Aadhaar (Front & Back)
              </option>

              <option value="PASSPORT">
                Passport
              </option>

              <option value="DRIVING_LICENSE">
                Driving License
              </option>

              <option value="OTHER">
                Other
              </option>
            </Select>
          </FormField>
        </div>

        <div
          className={`transition-opacity ${
            !documentType
              ? 'opacity-30 pointer-events-none'
              : 'opacity-100'
          }`}
        >
          <FileText
            className="mx-auto text-slate-500 mb-2"
            size={32}
          />

          <p className="text-sm text-slate-300 mb-1">
            2. Upload your{' '}
            {documentType
              ? documentType.replace('_', ' ')
              : 'document'}{' '}
            here.
          </p>

          <p className="text-xs text-slate-500 mb-4">
            Maximum 2 documents. Each file must be
            under 2 MB.
            <br />
            Accepted formats: PDF, JPG/JPEG, PNG
          </p>

          <input
            type="file"
            id="document-upload"
            className="hidden"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
            onChange={onFileUpload}
            disabled={
              uploadedFiles.length >= 2 ||
              !documentType
            }
          />

          <label
            htmlFor="document-upload"
            className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-700 hover:bg-slate-600 text-white cursor-pointer inline-block"
          >
            Browse Files
          </label>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-8 text-left">

            <p className="text-sm font-medium text-slate-300 mb-2">
              Selected Files:
            </p>

            <ul className="space-y-3">
              {uploadedFiles.map(
                (document, index) => (
                  <li
                    key={`${document.file.name}-${index}`}
                    className="flex items-center justify-between bg-slate-800/50 p-3 rounded-lg border border-slate-700"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="truncate text-sm font-medium text-slate-200">
                        {document.file.name}
                      </span>

                      <span className="text-xs text-slate-400">
                        {(
                          document.file.size /
                          (1024 * 1024)
                        ).toFixed(2)}{' '}
                        MB •{' '}
                        <span className="text-primary font-medium">
                          {document.type.replace(
                            '_',
                            ' '
                          )}
                        </span>
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        onRemoveFile(index)
                      }
                      className="text-red-400 hover:text-red-300 text-sm font-medium px-3 py-1 bg-red-400/10 rounded"
                    >
                      Remove
                    </button>
                  </li>
                )
              )}
            </ul>

          </div>
        )}

      </div>
    </div>
  );
}