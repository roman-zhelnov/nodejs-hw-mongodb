const parseType = (value) => {
  if (typeof value !== 'string') {
    return undefined;
  }
  const keys = ['work', 'home', 'personal'];

  if (!keys.includes(value)) return;
  return value;
};

const parseIsFavourite = (value) => {
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  return undefined;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
