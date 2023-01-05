import { combineReducers } from "redux"

import kiekkoReducer from "./components/kiekko/kiekkoReducer"
import userReducer from "./components/user/userReducer"
import moldReducer from "./components/mold/moldReducer"
import dropdownReducer from "./components/dropdown/dropdownReducer"
import plasticsReducer from "./components/plastics/plasticsReducer"
import shopReducer from "./components/shop/shopReducer"
import ratingReducer from "./components/rating/ratingReducer"
import muutReducer from "./components/muut/muutReducer"
import groupReducer from "./components/group/groupReducer"

const rootReducer = combineReducers({
  kiekko: kiekkoReducer,
  user: userReducer,
  mold: moldReducer,
  plastic: plasticsReducer,
  dropdowns: dropdownReducer,
  rating: ratingReducer,
  shop: shopReducer,
  muut: muutReducer,
  group: groupReducer,
})

export default rootReducer
