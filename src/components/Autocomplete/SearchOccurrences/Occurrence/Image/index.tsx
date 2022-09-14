import './styles.scss'
import { useState } from "react"
import fallbackSrc from '../../../../../assets/img/pokemon-fallback.png'

interface ImageProps {
  originalSrc?: string
}

const Image = ({ originalSrc }: ImageProps) => {
  const [src, setSrc] = useState(originalSrc || fallbackSrc)
  const isFallbackImage = src === fallbackSrc

  const handleOnError = () => setSrc(fallbackSrc)

  return (
    <div className="occurrence-image_container">
      <img className="occurrence-image_thumb" src={src} onError={handleOnError} />
      {!isFallbackImage ? <img className="occurrence-image_background" src={src} /> : null}
    </div>
  )
}

export default Image