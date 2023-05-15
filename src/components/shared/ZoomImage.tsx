import React from "react"
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"

import { imageUrl } from "./images"

const ZoomImage = ({ image }: { image: string }) => (
  <Zoom>
    <img src={`${imageUrl}t_kiekko/${image}`} width="30" height="30" />
  </Zoom>
)

export default ZoomImage
