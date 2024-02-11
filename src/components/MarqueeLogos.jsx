import Marquee from 'react-fast-marquee'

export function MarqueeLogos({ images, direction = 'right' }) {
  return (
    <Marquee gradient direction={direction}>
      {images.map((image, index) => (
        <div key={index} className='m-4 text-center h-100'>
          <a href={image.link} target='_blank'>
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading='lazy'
            />
          </a>
        </div>
      ))}
    </Marquee>
  )
}
