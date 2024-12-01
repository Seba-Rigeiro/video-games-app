import { FC } from "react";
import { Cover } from "@/app/entities/game";
import { getCoverUrl, Sizes } from "@/app/helpers/get-cover-url";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface CarouselProps {
  images: Cover[];
}

export const Carousel: FC<CarouselProps> = ({ images }) => {
  return (
    <Swiper spaceBetween="8px" slidesPerView="auto" loop={true}>
      {images.map((image, index) => (
        <SwiperSlide key={image.id} style={{ width: "85px", height: "85px" }}>
          <img
            src={getCoverUrl(image?.image_id ?? "", Sizes.SMALL)}
            alt={`Slide ${index}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
