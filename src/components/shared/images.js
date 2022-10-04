export const imageUrl = "https://res.cloudinary.com/djc4j4dcs/"

export const admin =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAABBklEQVQokY3TPUoDQRjG8V+STgQjblKEVDGaVmwEsZF4B/EG3sAzqI2tRjtbbxFETyAINtr5hd7AYmbD5iUL/mGZnXk/931mGxbTwQ4KfOIRH9GpFfYjnGELb3jFMo5wiCd8L6p2gEus1HTTxhXG0TDKgY2awJIGJhhWD29qKm7WdDCBJrrSUH6DUw/TvFb5yU/Rwr40nOfgdIw77OI+2JbQa2ItV45s4zavkXcUTXxJesbAvjTE/oIE5afqSNpWucAgvw/yvsp57hhcS1MsGQbn6n5V0nvGRj74r87r0TDOCdrRUKk4kdSZZYrtnUg6TqWpdrEnXaJTvNQFlxTm/6oHSZU5/gCqTyv6ZoUb0wAAAABJRU5ErkJggg=="

export const boot = 
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAAA60lEQVQoka3SsS5EQRQG4A9b8AIa1Ua3su8gQqFV7wPIPgBRIRHFPoGCRinRKkWh2FKrkE00FDYasYsExcyNu5M7NyH+5M/MnDl/5p9zDv+IQ7zg4DeiNrbxhmOM47ldJ5qJaxfrOMMr+ljDLK5y4kZpP8Jzcq5FWbwaWUa/TjydiT+hJ1hvZHKyF6fYwQUuIwfRyW2RVBRsObLAIt6xJdRhHkvRzYfkO3v4quBm4qiJIRaY/PM+phIeJeKB0LqVVLybeT3lRtXLZdxUxD7xGPcP/FT7XJimE3SE2e4KLbtHC9e4w5zJYfobvgFnGToaEjzA1gAAAABJRU5ErkJggg=="

export const magnify = image => {
  return {
    imageProps: {
      alt: "kuva",
      src: `${imageUrl}t_thumb/${image}`,
      width: 30,
      height: 30
    },
    magnifiedImageProps: {
      alt: "",
      src: `${imageUrl}t_kiekko/${image}`,
      width: 600,
      height: 600
    },
    magnifyContainerProps : {
      height : 600,
      width : 600
    }
  }
}
