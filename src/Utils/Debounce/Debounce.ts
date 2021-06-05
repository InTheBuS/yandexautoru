export const debounce = <CTX, ARGS>(fn: (this: CTX, ...args: ARGS[]) => void, ms = 400)
  : (this: CTX, ...args: ARGS[]) => void => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function timeoutClear(this: CTX, ...args: ARGS[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
