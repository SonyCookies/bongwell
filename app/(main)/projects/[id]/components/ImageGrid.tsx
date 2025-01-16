import Image from 'next/image'
import { motion } from 'framer-motion'

interface ImageGridProps {
  images: string[]
  onImageClick: (image: string) => void
}

export default function ImageGrid({ images, onImageClick }: ImageGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.length > 0 ? (
        images.map((image, index) => (
          <motion.div
            key={index}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => onImageClick(image)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={image}
              alt={`Project Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </motion.div>
        ))
      ) : (
        <div className="col-span-full text-center py-8 bg-gray-100 rounded-lg">
          <p className="text-gray-500">No images available</p>
        </div>
      )}
    </div>
  )
}

