import React from "react";
import Image from "next/image"

const Carousel = ({blogs }) => {
  return (
    <div>
      <Image
        src={url}
        alt={alt}
        width={0}
        height={0}
        fill={true}
        sizes="100vh"
        style={{ objectFit: "fill" }}
      />
    </div>
  );
};

export default Carousel;
