import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import Product from "../supabase/model/Product";
import { removeBackground } from "@cloudinary/url-gen/actions/effect";
import Loading from "./Loading";

const ClodinaryImg = ({ img_url: publicID }: Product) => {
  // Loading state for the image
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_NAME },
  });

  // Use this sample image or upload your own via the Media Explorer
  const img = cld
    .image(publicID)
    .format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
    .effect(removeBackground())
    .quality("auto");

  return (
    <div className="flex items-center justify-center h-full">
      {isLoading && <Loading />}

      <AdvancedImage
        onLoad={handleImageLoad}
        plugins={[lazyload()]}
        cldImg={img}
      />
    </div>
  );
};

export default ClodinaryImg;
