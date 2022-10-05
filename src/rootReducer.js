import { combineReducers } from "redux"

import kiekkoReducer from "./components/kiekko/kiekkoReducer"
import userReducer from "./components/user/userReducer"
import moldReducer from "./components/mold/moldReducer"
import dropdownReducer from "./components/dropdown/dropdownReducer"
import muoviReducer from "./components/muovi/muoviReducer"
import myytavatReducer from "./components/myytavat/myytavatReducer"
import ratingReducer from "./components/rating/ratingReducer"
import ostoReducer from "./components/osto/ostoReducer"
import muutReducer from "./components/muut/muutReducer"
import groupReducer from "./components/group/groupReducer"
import adminReducer from "./components/admin/adminReducer"

const rootReducer = combineReducers({
  kiekko: kiekkoReducer,
  user: userReducer,
  mold: moldReducer,
  muovi: muoviReducer,
  dropdowns: dropdownReducer,
  myytavat: myytavatReducer,
  rating: ratingReducer,
  osto: ostoReducer,
  muut: muutReducer,
  group: groupReducer,
  admin: adminReducer
})

export default rootReducer
