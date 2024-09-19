type ReducerAction = {
  type: string;
  payload: unknown;
};

export type ReducerCallback<T> = (
  state: Readonly<T>,
  action: ReducerAction
) => Readonly<T>;

export const reducer = <T>(
  reducerCallback: (state: T, action: ReducerAction) => T,
  initialState: T
) => {
  let state = initialState;

  const dispatch = (action: ReducerAction) => {
    state = reducerCallback(state as T, action);
  };

  return [() => state, dispatch] as const;
};
