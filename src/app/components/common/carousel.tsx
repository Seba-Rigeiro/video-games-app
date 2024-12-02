import { FC } from "react";
import { Cover } from "@/app/entities/game";
import { getCoverUrl, Sizes } from "@/app/helpers/get-cover-url";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Box } from "@mui/material";

interface CarouselProps {
  images: Cover[];
}

export const Carousel: FC<CarouselProps> = ({ images }) => {
  return (
    <Swiper spaceBetween="8px" slidesPerView="auto">
      {images.map((image, index) => (
        <SwiperSlide
          key={image.id}
          style={{ width: "85px", height: "85px", position: "relative" }}
        >
          <Box
            width="100%"
            height="100%"
            position="relative"
            borderRadius="8px"
            overflow="hidden"
          >
            <Image
              src={getCoverUrl(image?.image_id ?? "", Sizes.SMALL)}
              alt={`Slide ${index}`}
              width={85}
              height={85}
            />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
