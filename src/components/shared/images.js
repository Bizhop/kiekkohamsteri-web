export const imageUrl = "https://res.cloudinary.com/djc4j4dcs/"

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
