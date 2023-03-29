import React, { useEffect, useState } from "react"
import { Box, Stack, Button, Paper } from "@mui/material"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"

import { loadImage } from "../shared/utils"

const ImageCrop = ({ image, updateImage, imageUploading }) => {
  const [croppedImage, setCroppedImage] = useState(null)
  const [imageDimensions, setImageDimensions] = useState(null)
  const [crop, setCrop] = useState({})

  useEffect(() => {
    if (!imageDimensions) {
      loadImage(image.image).then(loadedImage =>
        setImageDimensions(loadedImage.naturalWidth + " x " + loadedImage.naturalHeight)
      )
    }
  }, [imageDimensions])

  const completeCrop = ({ crop, image }) => {
    processCrop(crop, image.image).then(setCroppedImage)
  }

  return (
    <Box component={Paper} elevation={3} padding={1}>
      <p>
        <strong>Kuvan alkuperäinen koko:</strong> {imageDimensions ? imageDimensions : " x "}
      </p>
      <p>
        <strong>Valinta-alue:</strong> {extractCropDimensions(crop)}
      </p>
      <Stack direction="column" spacing={1} marginBottom={1} paddingBottom={10}>
        <Stack direction="row" spacing={1}>
          <ReactCrop
            onChange={(crop, _) => setCrop(crop)}
            crop={crop}
            onComplete={(crop, _) => completeCrop({ crop, image })}
            aspect={1}
            style={{ border: "2px solid grey" }}
          >
            <img src={image.image} />
          </ReactCrop>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={() => updateImage(image.uuid, croppedImage)}
            disabled={croppedImage === null || imageUploading}
          >
            Päivitä kuva
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

const extractCropDimensions = crop => {
  if (typeof crop.width === "number" && typeof crop.height === "number") {
    return `${Math.round(crop.width)} x ${Math.round(crop.height)}`
  }
  return " x "
}

const processCrop = (crop, base64) =>
  new Promise((resolve, reject) => {
    var img = new Image()

    img.onload = event => {
      try {
        const loadedImage = event.target

        const canvas = document.createElement("canvas")
        canvas.width = crop.width
        canvas.height = crop.height
        const ctx = canvas.getContext("2d")

        ctx.drawImage(
          loadedImage,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          crop.width,
          crop.height
        )

        resolve(canvas.toDataURL("image/jpeg"))
      } catch (error) {
        reject(error)
      }
    }

    img.src = base64
  })

export default ImageCrop
