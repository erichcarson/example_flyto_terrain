import { types } from "state/actions";
import { Viewport } from "types";

export const setViewport = (viewport: Viewport) => ({
  type: types.SET_USER_VIEWPORT,
  payload: viewport,
});
