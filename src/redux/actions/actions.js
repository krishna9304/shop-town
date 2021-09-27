import { ActionTypes } from "../constants/actionconstants";

export const setUser = (user) => ({
  type: ActionTypes.AUTHENTICATED_USER,
  payload: user,
});
export const setAuth = (auth) => ({
  type: ActionTypes.AUTH,
  payload: auth,
});
export const setShop = (shop) => ({
  type: ActionTypes.SHOP,
  payload: shop,
});
export const setReviews = (reviews) => ({
  type: ActionTypes.REVIEWS,
  payload: reviews,
});
export const setLocation = (loc) => ({
  type: ActionTypes.LOC,
  payload: loc,
});
