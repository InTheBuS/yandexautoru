// eslint-disable-next-line @typescript-eslint/ban-types
export const debounce = (fn: Function, ms = 400): (value: unknown) => void => {
  let timeoutId: ReturnType<typeof setTimeout>;
  // eslint-disable-next-line func-names
  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
