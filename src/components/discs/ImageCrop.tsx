import React, { useEffect, useState } from "react"
import { Box, Stack, Button, Paper } from "@mui/material"
import ReactCrop, { Crop, PercentCrop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"

import { loadImage } from "../shared/utils"
import { DiscImage } from "./DiscsContainer"

type Dimensions = {
  x: number,
  y: number
}

const ImageCrop = ({ image, updateImage, imageUploading }: {
  image: DiscImage,
  updateImage: any,
  imageUploading: boolean
}) => {
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [imageDimensions, setImageDimensions] = useState<Dimensions>({ x: 0, y: 0 })
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0, width: 0, height: 0, unit: "%" })

  useEffect(() => {
    loadImage(image.image).then(loadedImage =>
      setImageDimensions({ x: loadedImage.naturalWidth, y: loadedImage.naturalHeight })
    )
  }, [image])

  const completeCrop = ({ crop, image }) => {
    processCrop(crop, image.image).then(cropped => {
      setCroppedImage(cropped)
    })
  }

  return (
    <Box component={Paper} elevation={3} padding={1}>
      <p>
        <strong>Kuvan alkuperäinen koko:</strong> {`${imageDimensions.x} x ${imageDimensions.y}`}
      </p>
      <p>
        <strong>Valinta-alue:</strong> {extractCropDimensions(crop, imageDimensions)}
      </p>
      <Stack direction="column" spacing={1} marginBottom={1} paddingBottom={10}>
        <Stack direction="row" spacing={1}>
          <ReactCrop
            onChange={(_, crop) => setCrop(crop)}
            crop={crop}
            onComplete={(_, crop) => completeCrop({ crop, image })}
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

const extractCropDimensions = (crop: Crop, originalDimensions: Dimensions) => {
  if (typeof crop.width === "number" && typeof crop.height === "number") {
    return `${Math.round(crop.width * originalDimensions.x / 100)} x ${Math.round(crop.height * originalDimensions.y / 100)}`
  }
  return " x "
}

const processCrop = (crop: PercentCrop, base64?: string) =>
  new Promise<string>((resolve, reject) => {
    if (!base64) {
      reject
    }
    else {
      var img = new Image()

      img.onload = event => {
        try {
          const loadedImage = event.target

          if (loadedImage instanceof HTMLImageElement) {

            const originalWidth = loadedImage.naturalWidth
            const originalHeight = loadedImage.naturalHeight

            const cropValuesAsPixels = {
              x: crop.x * originalWidth / 100,
              y: crop.y * originalHeight / 100,
              width: crop.width * originalWidth / 100,
              height: crop.height * originalHeight / 100,
              targetWidth: originalWidth * crop.width / 100,
              targetHeight: originalHeight * crop.height / 100
            }

            const canvas = document.createElement("canvas")
            canvas.width = cropValuesAsPixels.targetWidth
            canvas.height = cropValuesAsPixels.targetHeight
            const ctx = canvas.getContext("2d")

            if (ctx) {
              ctx.drawImage(
                loadedImage,
                cropValuesAsPixels.x,
                cropValuesAsPixels.y,
                cropValuesAsPixels.width,
                cropValuesAsPixels.height,
                0,
                0,
                cropValuesAsPixels.targetWidth,
                cropValuesAsPixels.targetHeight
              )

              resolve(canvas.toDataURL("image/jpeg"))
            }
            else {
              reject("Unable to initialize 2d context")
            }
          }
        } catch (error) {
          reject(error)
        }
      }

      img.src = base64
    }
  })

export default ImageCrop
