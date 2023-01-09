import { combineReducers } from "redux"

import discsReducer from "./components/discs/discsReducer"
import userReducer from "./components/user/userReducer"
import moldReducer from "./components/mold/moldReducer"
import dropdownReducer from "./components/dropdown/dropdownReducer"
import plasticsReducer from "./components/plastics/plasticsReducer"
import shopReducer from "./components/shop/shopReducer"
import ratingReducer from "./components/rating/ratingReducer"
import othersReducer from "./components/others/othersReducer"
import groupReducer from "./components/group/groupReducer"

const rootReducer = combineReducers({
  discs: discsReducer,
  user: userReducer,
  mold: moldReducer,
  plastic: plasticsReducer,
  dropdowns: dropdownReducer,
  rating: ratingReducer,
  shop: shopReducer,
  others: othersReducer,
  group: groupReducer,
})

export default rootReducer
