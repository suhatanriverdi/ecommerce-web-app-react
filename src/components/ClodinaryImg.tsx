import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, lazyload } from "@cloudinary/react";
import { removeBackground } from "@cloudinary/url-gen/actions/effect";

const ClodinaryImg = ({
  img_url: publicID,
  isLoading,
  setIsLoading,
}: {
  img_url: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}) => {
  // Loading state for the image
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
    <div className="flex items-center justify-center w-full h-full">
      <AdvancedImage
        onLoad={handleImageLoad}
        plugins={[lazyload()]}
        cldImg={img}
        className={
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }
      />
    </div>
  );
};

export default ClodinaryImg;
