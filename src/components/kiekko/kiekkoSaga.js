import { all, call, put, takeEvery } from "redux-saga/effects"
import { pick } from "ramda"

import Api from "../Api"
import {
  UPDATE_KIEKKO_REQUEST,
  getKiekot,
  updateKiekkoFailure,
  TOGGLE_KIEKKO_EDIT_MODAL,
  UPLOAD_IMAGE,
  uploadSuccess,
  uploadFailure,
  deleteKiekkoFailure,
  DELETE_DISC,
  APPLY_PREDICATES,
  filterKiekot,
  KIEKKO_REQUEST,
  kiekkoSuccess,
  kiekkoError,
  UPDATE_IMAGE,
  updateImageFailure,
  JULKISET_REQUEST,
  julkisetSuccess,
  julkisetFailure,
  LOST_REQUEST,
  lostSuccess,
  FOUND_REQUEST,
  getLost,
  CHOOSE_IMAGE,
  updateImageDimensions,
  chooseImageSuccess,
  CHOOSE_IMAGE_SUCCESS
} from "./kiekkoActions"
import { logout } from "../user/userActions"
import { getDropdownsByValmistaja } from "../dropdown/dropdownActions"
import { defaultSort } from "../shared/text"
import { reject } from "ramda"

const updateFields = [
  "valmId",
  "moldId",
  "muoviId",
  "variId",
  "kunto",
  "tussit",
  "paino",
  "muuta",
  "dyed",
  "hohto",
  "itb",
  "loytokiekko",
  "myynnissa",
  "spessu",
  "swirly",
  "hinta",
  "publicDisc",
  "lost"
]

const resizeImage = image =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      try {
        if (this.naturalWidth > 600) {
          const canvas = document.createElement("canvas")
          canvas.width = 600
          canvas.height = 600
          const ctx = canvas.getContext("2d")

          ctx.drawImage(this, 0, 0, 600, 600)

          resolve(canvas.toDataURL("image/jpeg"))
        } else {
          resolve(this.src)
        }
      } catch (e) {
        reject(e)
      }
    }
    img.src = image
  })

const loadImage = base64 =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = base64
  })

const base64Reader = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

function* getKiekkoSaga(action) {
  try {
    const response = yield call(Api.get, `api/kiekot/${action.id}`)
    yield put(kiekkoSuccess(response))
  } catch (e) {
    yield put(kiekkoError(e))
  }
}

function* updateKiekkoSaga(action) {
  try {
    yield call(Api.put, `api/kiekot/${action.kiekko.id}`, pick(updateFields, action.kiekko))
    yield put(getKiekot(defaultSort))
  } catch (e) {
    if (e.response.status === 403) {
      yield put(logout())
    } else {
      yield put(updateKiekkoFailure(e))
    }
  }
}

function* toggleEditModalSaga(action) {
  if (action.kiekko) {
    yield put(getDropdownsByValmistaja(action.kiekko.valmId))
  }
}

function* uploadImageSaga(action) {
  try {
    const resized = yield call(resizeImage, action.data)
    const response = yield call(Api.post, "api/kiekot", {
      name: "",
      data: resized
    })
    yield put(uploadSuccess(response))
  } catch (e) {
    if (e.response.status === 403) {
      yield put(logout())
    } else {
      yield put(uploadFailure(e))
    }
  }
}

function* deleteDiscSaga(action) {
  try {
    yield call(Api.delete, `api/kiekot/${action.id}`)
    yield put(getKiekot(defaultSort))
  } catch (e) {
    if (e.response.status === 403) {
      yield put(logout())
    } else {
      yield put(deleteKiekkoFailure(e))
    }
  }
}

function* applyPredicatesSaga() {
  yield put(filterKiekot())
}

function* updateImageSaga(action) {
  try {
    const resized = yield call(resizeImage, action.params.image)
    yield call(Api.patch, `api/kiekot/${action.params.id}/update-image`, {
      name: "",
      data: resized
    })
    yield put(getKiekot(defaultSort))
  } catch (e) {
    if (e.response.status === 403) {
      yield put(logout())
    } else {
      yield put(updateImageFailure(e))
    }
  }
}

function* getJulkisetSaga(action) {
  try {
    const response = yield call(
      Api.get,
      `api/kiekot/public-lists?size=1000&sort=${action.params.sort}`
    )
    yield put(
      julkisetSuccess({
        julkiset: response,
        newSortColumn: action.params.newSortColumn
      })
    )
  } catch (e) {
    if (e.response.status === 403) {
      yield put(logout())
    } else {
      yield put(julkisetFailure(e))
    }
  }
}

function* getLostSaga(action) {
  try {
    const response = yield call(Api.get, `api/kiekot/lost?size=1000&sort=${action.params.sort}`)
    yield put(
      lostSuccess({
        lost: response.content,
        newSortColumn: action.params.newSortColumn
      })
    )
  } catch (e) {
    if (e.response.status === 403) {
      yield put(logout())
    } else {
      yield put(lostFailure(e))
    }
  }
}

function* foundSaga(action) {
  try {
    yield call(Api.patch, `api/kiekot/${action.id}/found`)
    yield put(
      getLost({
        sort: "updatedAt,desc",
        newSortColumn: "Pvm"
      })
    )
  } catch (e) {
    console.log(e)
  }
}

function* updateImageDimensionsSaga(action) {
  try {
    const loadedImage = yield call(loadImage, action.base64)
    yield put(updateImageDimensions(loadedImage.naturalWidth + " x " + loadedImage.naturalHeight))
  } catch (e) {
    console.log(e)
  }
}

function* readImageBase64(action) {
  try {
    if(action.acceptedFiles.length == 1) {
      const base64 = yield call(base64Reader, action.acceptedFiles[0])
      yield put(chooseImageSuccess(base64))
    } else {
      console.log("Zero or more than one file sent")
    }
  } catch (e) {
    console.log(e)
  }
}

function* kiekkoSaga() {
  yield all([
    takeEvery(UPDATE_KIEKKO_REQUEST, updateKiekkoSaga),
    takeEvery(TOGGLE_KIEKKO_EDIT_MODAL, toggleEditModalSaga),
    takeEvery(UPLOAD_IMAGE, uploadImageSaga),
    takeEvery(DELETE_DISC, deleteDiscSaga),
    takeEvery(APPLY_PREDICATES, applyPredicatesSaga),
    takeEvery(KIEKKO_REQUEST, getKiekkoSaga),
    takeEvery(UPDATE_IMAGE, updateImageSaga),
    takeEvery(JULKISET_REQUEST, getJulkisetSaga),
    takeEvery(LOST_REQUEST, getLostSaga),
    takeEvery(FOUND_REQUEST, foundSaga),
    takeEvery(CHOOSE_IMAGE, readImageBase64),
    takeEvery(CHOOSE_IMAGE_SUCCESS, updateImageDimensionsSaga)
  ])
}

export default kiekkoSaga
