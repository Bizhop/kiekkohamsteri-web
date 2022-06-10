import { all, call, put, takeEvery } from "redux-saga/effects"

import {
  TOGGLE_KIEKKO_EDIT_MODAL,
  UPLOAD_IMAGE,
  UPDATE_IMAGE,
  CHOOSE_IMAGE,
  updateImageDimensions,
  chooseImageSuccess,
  CHOOSE_IMAGE_SUCCESS,
  uploadImageApi,
  updateImageApi,
  cropComplete,
  COMPLETE_CROP
} from "./kiekkoActions"
import { getDropdownsByValmistaja } from "../dropdown/dropdownActions"

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
    img.onload = event => {
      try {
        const loadedImage = event.target
        if (loadedImage.naturalWidth > 600) {
          const canvas = document.createElement("canvas")
          canvas.width = 600
          canvas.height = 600
          const ctx = canvas.getContext("2d")

          ctx.drawImage(loadedImage, 0, 0, 600, 600)

          resolve(canvas.toDataURL("image/jpeg"))
        } else {
          resolve(loadedImage.src)
        }
      } catch (error) {
        console.log(error)
        reject(error)
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

const processCrop = (pixelCrop, base64) => 
  new Promise((resolve, reject) => {
    console.log("processing")
    console.log(pixelCrop)
    console.log(base64)
    var img = new Image()

    img.onload = event => {
      try {
        console.log("image loaded")
        const loadedImage = event.target

        const canvas = document.createElement("canvas")
        canvas.width = pixelCrop.width
        canvas.height = pixelCrop.height
        const ctx = canvas.getContext("2d")

        ctx.drawImage(
          loadedImage,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        )
        
        resolve(canvas.toDataURL("image/jpeg"))
      }
      catch (error) {
        console.log(error)
        reject(error)
      }
    }

    img.src = base64
  })

function* completeCropSaga(action) {
  console.log("complete crop saga")
  const croppedImage = yield call(processCrop, action.crop, action.image)
  yield put(cropComplete(croppedImage))
}

function* toggleEditModalSaga(action) {
  if (action.kiekko) {
    yield put(getDropdownsByValmistaja(action.kiekko.valmId))
  }
}

function* uploadImageSaga(action) {
  const resized = yield call(resizeImage, action.data)
  yield put(uploadImageApi({
    name: "",
    data: resized
  }))
}

function* updateImageSaga(action) {
  const resized = yield call(resizeImage, action.params.image)
  yield put(updateImageApi({
    id: action.params.id,
    data: {
      name: "",
      data: resized
    }
  }))
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
    takeEvery(TOGGLE_KIEKKO_EDIT_MODAL, toggleEditModalSaga),
    takeEvery(UPLOAD_IMAGE, uploadImageSaga),
    takeEvery(UPDATE_IMAGE, updateImageSaga),
    takeEvery(CHOOSE_IMAGE, readImageBase64),
    takeEvery(CHOOSE_IMAGE_SUCCESS, updateImageDimensionsSaga),
    takeEvery(COMPLETE_CROP, completeCropSaga)
  ])
}

export default kiekkoSaga
