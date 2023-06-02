import { types } from "state/actions";
import { AnyAction } from "redux";

const initialState = {
  data: {
    ApplicationSettings: {
      viewport: {
        latitude: 32.6417,
        longitude: -112.4678,
        zoom: 13.1,
        pitch: 75,
        bearing: 48,
      },
    },
  },
};

export const UserReducer = (
  state = initialState,
  action: AnyAction
): typeof initialState => {
  switch (action.type) {
    case types.SET_USER_VIEWPORT:
      return {
        ...state,
        data: {
          ...state.data,
          ApplicationSettings: {
            ...state.data.ApplicationSettings,
            viewport: action.payload,
          },
        },
      };
    default:
      return state;
  }
};

export default UserReducer;
