import type { DocumentInfo } from '../../../../shared/types/onboarding.types';

interface DocumentsCardProps {
  documents?: DocumentInfo[];
}

export function DocumentsCard({
  documents,
}: DocumentsCardProps) {
  if (!documents?.length) {
    return null;
  }

  return (
    <div className="glass-panel p-6 rounded-xl">

      <h2 className="text-lg font-semibold border-b border-slate-700 pb-3 mb-4">
        Documents
      </h2>

      <div className="grid grid-cols-2 gap-4">

        {documents.map((doc) => (
          <div
            key={doc._id}
            className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 flex items-center justify-between"
          >
            <div className="overflow-hidden mr-4">

              <p
                className="font-medium text-slate-200 truncate"
                title={doc.fileName}
              >
                {doc.fileName}
              </p>

              <p className="text-xs text-slate-400">
                {doc.type.replace('_', ' ')}
              </p>

            </div>

            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 rounded text-sm font-medium transition-colors shrink-0"
            >
              View
            </a>
          </div>
        ))}

      </div>
    </div>
  );
}