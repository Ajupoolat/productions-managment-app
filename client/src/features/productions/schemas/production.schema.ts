import { z } from 'zod';

export const createProductionSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Production name must be at least 2 characters.')
      .max(100, 'Production name cannot exceed 100 characters.')
      .regex(
        /^[a-zA-Z0-9\s\-&()'.]+$/,
        'Production name contains invalid characters.'
      ),

    description: z
      .string()
      .trim()
      .min(10, 'Description must be at least 10 characters.')
      .max(1000, 'Description cannot exceed 1000 characters.'),

    startDate: z
      .string()
      .date('Please enter a valid start date.'),

    endDate: z
      .string()
      .date('Please enter a valid end date.'),

    budget: z
      .coerce
      .number()
      .finite('Budget must be a valid number.')
      .min(1, 'Budget must be greater than 0.')
      .max(1_000_000_000_000, 'Budget exceeds the allowed limit.'),

    notes: z
      .string()
      .trim()
      .min(5, 'Notes must be at least 5 characters.')
      .max(2000, 'Notes cannot exceed 2000 characters.'),
  })
  .refine(
    (data) => new Date(data.endDate) >= new Date(data.startDate),
    {
      message: 'End date must be after or equal to the start date.',
      path: ['endDate'],
    }
  );

export type CreateProductionInput = z.input<typeof createProductionSchema>;
export type CreateProductionValues = z.output<typeof createProductionSchema>;
