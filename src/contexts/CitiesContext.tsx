/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { BASE_URL } from "../components/constant";
import { DataType } from "../components/model";

type CityProviderType = {
  children: React.ReactNode;
};

type CitiesContextType = {
  cities: DataType[] | null;
  isLoading: boolean;
  currentCity: DataType | null;
  error: string;
  getCity: (id: string) => Promise<void>;
  createCity: (newCity: Omit<DataType, "id">) => Promise<void>;
  deleteCity: (id: string) => Promise<void>;
};

type StateType = {
  cities: DataType[] | null;
  currentCity: DataType | null;
  isLoading: boolean;
  error: string;
};

type ActionType = {
  type: string;
  payload?: DataType[] | DataType | string;
};

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

const initState: StateType = {
  cities: null,
  currentCity: null,
  isLoading: false,
  error: "",
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload as DataType[],
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload as DataType,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...(state.cities ?? []), action.payload as DataType],
        currentCity: action.payload as DataType,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        currentCity: null,
        cities:
          state.cities?.filter((city) => city.id !== action.payload) ?? null,
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload as string };
    default:
      throw new Error("Action type not supported");
  }
};

const CitiesProvider = ({ children }: CityProviderType) => {
  const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(
    reducer,
    initState
  );

  useEffect(() => {
    const fetchCity = async () => {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = (await res.json()) as DataType[];
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    };

    fetchCity();
  }, []);

  const getCity = useCallback(
    async (id: string) => {
      if (id === currentCity?.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = (await res.json()) as DataType;
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    },
    [currentCity?.id]
  );

  const createCity = async (newCity: Omit<DataType, "id">) => {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = (await res.json()) as DataType;
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating city...",
      });
    }
  };

  const deleteCity = async (id: string) => {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city...",
      });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside of the CitiesProvider");

  return context;
};

export { CitiesProvider, useCities };
