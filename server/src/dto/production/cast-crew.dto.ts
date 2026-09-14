import * as z from 'zod';

// ==========================================
// ASSIGNMENT SCHEMAS
// ==========================================

export const assignCastSchema = z.object({
  userId: z.string({
    error: (issue) =>
      issue.input === undefined
        ? 'User ID is required'
        : 'User ID must be a string',
  })
    .trim()
    .min(1, 'User ID cannot be empty'),

  characterId: z.string({
    error: (issue) =>
      issue.input === undefined
        ? 'Character ID is required'
        : 'Character ID must be a string',
  })
    .trim()
    .min(1, 'Character ID cannot be empty'),
});

export type AssignCastInput = z.infer<typeof assignCastSchema>;

// ==========================================
// CREW ASSIGNMENT SCHEMAS
// ==========================================

export const assignCrewSchema = z.object({
  userId: z.string({
    error: (issue) =>
      issue.input === undefined
        ? 'User ID is required'
        : 'User ID must be a string',
  })
    .trim()
    .min(1, 'User ID cannot be empty'),

  departmentId: z.string({
    error: (issue) =>
      issue.input === undefined
        ? 'Department ID is required'
        : 'Department ID must be a string',
  })
    .trim()
    .min(1, 'Department ID cannot be empty'),

  workId: z.string({
    error: (issue) =>
      issue.input === undefined
        ? 'Work/Position ID is required'
        : 'Work/Position ID must be a string',
  })
    .trim()
    .min(1, 'Work/Position ID cannot be empty'),
});

export type AssignCrewInput = z.infer<typeof assignCrewSchema>;

// ==========================================
// CHARACTER SCHEMAS
// ==========================================

export const characterSchema = z.object({
  name: z.string({
    error: (issue) =>
      issue.input === undefined
        ? 'Name is required'
        : 'Name must be a string',
  })
    .trim()
    .min(2, 'Name must be at least 2 characters'),

  description: z
    .string()
    .trim()
    .max(1000, 'Description cannot exceed 1000 characters')
    .optional(),
});

export type CharacterInput = z.infer<typeof characterSchema>;

// ==========================================
// DEPARTMENT SCHEMAS
// ==========================================

export const departmentSchema = z.object({
  name: z.string({
    error: (issue) =>
      issue.input === undefined
        ? 'Department name is required'
        : 'Department name must be a string',
  })
    .trim()
    .min(2, 'Department name must be at least 2 characters'),

  description: z
    .string()
    .trim()
    .max(1000, 'Description cannot exceed 1000 characters')
    .optional(),
});

export type DepartmentInput = z.infer<typeof departmentSchema>;

// ==========================================
// WORK SCHEMAS
// ==========================================

export const workSchema = z.object({
  title: z.string({
    error: (issue) =>
      issue.input === undefined
        ? 'Work title is required'
        : 'Work title must be a string',
  })
    .trim()
    .min(2, 'Work title must be at least 2 characters'),

  departmentId: z.string({
    error: (issue) =>
      issue.input === undefined
        ? 'Department ID is required'
        : 'Department ID must be a string',
  })
    .trim()
    .min(1, 'Department ID cannot be empty'),

  description: z
    .string()
    .trim()
    .max(1000, 'Description cannot exceed 1000 characters')
    .optional(),
});

export type WorkInput = z.infer<typeof workSchema>;