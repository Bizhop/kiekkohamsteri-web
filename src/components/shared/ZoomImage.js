import React from "react"
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"

import { imageUrl } from "./images"

const ZoomImage = props => (
  <Zoom>
    <img src={`${imageUrl}t_kiekko/${props.image}`} width="30" height="30" />
  </Zoom>
)

export default ZoomImage
