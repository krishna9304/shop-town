import { ActionTypes } from "../constants/actionconstants";
let default_state = {
  auth: false,
  user: null,
  shop: null,
  reviews: [],
};

let reducerFunction = (state = default_state, action) => {
  switch (action.type) {
    case ActionTypes.AUTH:
      return { ...state, auth: action.payload };
    case ActionTypes.AUTHENTICATED_USER:
      return { ...state, user: action.payload };
    case ActionTypes.SHOP:
      return { ...state, shop: action.payload };
    case ActionTypes.REVIEWS:
      return { ...state, reviews: action.payload };
    default:
      return state;
  }
};

export default reducerFunction;
