export function enumToOptions<T extends string>(
  values: readonly T[] | T[]
) {
  return values.map((value) => ({
    label: value.replace(/_/g, ' '),
    value,
  }));
}
