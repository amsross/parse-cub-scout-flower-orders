export const groupBy =
  <T>(keyGenerator: (item: T) => string) =>
  (source: T[]) => {
    const result: Record<string, T[]> = {};

    for (const item of source) {
      const key = keyGenerator(item);
      const items = result[key];
      if (items) {
        items.push(item);
      } else {
        result[key] = [item];
      }
    }

    return result;
  };
