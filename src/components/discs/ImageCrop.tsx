import React, { useEffect, useState } from "react"
import { Box, Stack, Button, Paper } from "@mui/material"
import ReactCrop, { Crop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"

import { loadImage } from "../shared/utils"
import { DiscImage } from "./DiscsContainer"

const ImageCrop = ({ image, updateImage, imageUploading }: {
  image: DiscImage,
  updateImage: any,
  imageUploading: boolean
}) => {
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [imageDimensions, setImageDimensions] = useState<string | null>(null)
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0, width: 0, height: 0, unit: "px" })

  useEffect(() => {
    if (!imageDimensions) {
      loadImage(image.image).then(loadedImage =>
        setImageDimensions(loadedImage.naturalWidth + " x " + loadedImage.naturalHeight)
      )
    }
  }, [imageDimensions])

  const completeCrop = ({ crop, image }) => {
    console.log("original")
    console.log(image.image)
    processCrop(crop, image.image).then(cropped => {
      console.log("cropped")
      console.log(cropped)
      setCroppedImage(cropped)
    })
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

const processCrop = (crop: Crop, base64?: string) =>
  new Promise<string>((resolve, reject) => {
    if (!base64) {
      reject
    }
    else {
      var img = new Image()

      img.onload = event => {
        try {
          const loadedImage = event.target

          console.log(loadedImage)

          if (loadedImage instanceof HTMLImageElement) {

            const canvas = document.createElement("canvas")
            canvas.width = crop.width
            canvas.height = crop.height
            const ctx = canvas.getContext("2d")

            if (ctx) {
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
