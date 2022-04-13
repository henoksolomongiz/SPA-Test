import React, { useReducer, createContext } from "react";
import axios from "axios";

export const data = ["A", "B", "C", "D", "E"];
type InitialStateType = {
  data: any[];
};

type ActionType = {
  type: string;
  payload: string;
};

const initialState: InitialStateType = {
  data,
};

export const DataContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const reducer = (state: InitialStateType, action: ActionType) => {
  switch (action.type) {
    case "SEARCH":
      if (action.payload.length > 3) {
        return { data: searchData(state.data, action.payload) };
      }
      return state;
    case "MOVE":
      return {
        data: moveItem(),
      };
    default:
      return state;
  }
};
export function moveItem() {
  data.splice(data.length - 1, 0, data.splice(0, 1)[0]);
  return data;
}
export function searchData(data: any, term: any): any[] {
  axios.get(`https://itunes.apple.com/search?term=${term}`).then((res) => {
    const albums = Array.from(
      new Set(
        res?.data?.results
          .map((item: any) => item.collectionName)
         // .filter((value: string) => value != undefined)
          .sort((a: any, b: any) => (a !== b ? (a < b ? -1 : 1) : 0))
      )
    );
    albums.slice(0, 5).map((m: any, index: number) => {
      data.splice(5-index, 1);
      data.push(m);
    });
    return data;
  });
  return data;
}
export const DataContextProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DataContext.Provider>
  );
};
