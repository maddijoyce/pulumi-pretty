export const directions = {
  asc: 1,
  desc: -1,
};

export const compareField = <I, K extends keyof I>(
  a: I,
  b: I,
  {
    key,
    dir,
  }: {
    key: K | ((i: I) => string | number | null | undefined);
    dir: keyof typeof directions;
  }
) => {
  const dirN = directions[dir];

  const aSort = typeof key === "function" ? key(a) : a[key];
  const bSort = typeof key === "function" ? key(b) : b[key];

  if (aSort === null || aSort === undefined) {
    return dirN;
  }
  if (bSort === null || bSort === undefined) {
    return dirN * -1;
  }

  if (typeof aSort === "string" && typeof bSort === "string") {
    return aSort.localeCompare(bSort) * dirN;
  }
  if (typeof aSort === "number" && typeof bSort === "number") {
    return (aSort - bSort) * dirN;
  }

  return aSort > bSort ? dirN : dirN * -1;
};

export const sortField = <I, K extends keyof I>(
  items: I[],
  {
    key,
    dir,
    unique,
  }: {
    key: K | ((i: I) => string | number | null | undefined);
    dir: keyof typeof directions;
    unique?: K | ((i: I) => string | number | null | undefined);
  }
) => {
  let sliced = items.slice(0);

  if (unique) {
    sliced = sliced.filter((a, index, list) => {
      const aFilter = typeof unique === "function" ? unique(a) : a[unique];
      return (
        list.findIndex((b) => {
          const bFilter = typeof unique === "function" ? unique(b) : b[unique];
          return aFilter === bFilter;
        }) === index
      );
    });
  }

  return sliced.sort((a, b) => compareField(a, b, { key, dir }));
};
