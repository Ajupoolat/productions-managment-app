import * as z from 'zod';

import { ProductionStatus } from '../../constants/production-status';

export const createProductionSchema = z
  .object({
    name: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? 'Name is required'
            : 'Name must be a string',
      })
      .trim()
      .min(2, {
        error: 'Name must be at least 2 characters',
      }),

    description: z
      .string()
      .trim()
      .min(10, {
        error: 'Description must be at least 10 characters',
      }),

    status: z
      .enum(ProductionStatus)
      .optional(),

    startDate: z.iso.date({
      error: 'Start date must be a valid date',
    }),

    endDate: z.iso.date({
      error: 'End date must be a valid date',
    }),

    budget: z
      .number({
        error: 'Budget must be a number',
      })
      .min(0, {
        error: 'Budget cannot be negative',
      }),

    notes: z
      .string()
      .trim()
      .max(1000, {
        error: 'Notes cannot exceed 1000 characters',
      })
      .optional(),
  })
  .refine(
    (data) => data.endDate >= data.startDate,
    {
      error: 'End date must be after or equal to start date',
      path: ['endDate'],
    },
  );

export type CreateProductionInput =
  z.infer<typeof createProductionSchema>;