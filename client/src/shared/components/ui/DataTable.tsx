import {
  tableFeatures,
  useTable,
} from '@tanstack/react-table';

import type { ColumnDef } from '@tanstack/react-table';

export const features = tableFeatures({});

interface DataTableProps<TData> {
  columns: ColumnDef<typeof features, TData>[];
  data: TData[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function DataTable<TData>({
  columns,
  data,
  isLoading = false,
  emptyMessage = 'No results found.',
}: DataTableProps<TData>) {
  const table = useTable({
    features,
    columns,
    data,
  });

  if (isLoading) {
    return (
      <div className="py-8 text-center text-slate-400">
        Loading...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="py-8 text-center text-slate-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border-b border-slate-800/60 text-sm text-slate-400"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 font-medium"
                >
                  {header.isPlaceholder ? null : (
                    <table.FlexRender header={header} />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-slate-800/30 transition-colors hover:bg-slate-800/20"
            >
              {row.getAllCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-3 font-medium text-white"
                >
                  <table.FlexRender cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}