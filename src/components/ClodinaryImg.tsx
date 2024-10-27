import { Cloudinary } from "@cloudinary/url-gen";
// import { auto } from "@cloudinary/url-gen/actions/resize";
// import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";
import Product from "../supabase/model/Product";
import { removeBackground } from "@cloudinary/url-gen/actions/effect";

const ClodinaryImg = ({ img_url: publicID }: Product) => {
  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_NAME },
  });

  // Use this sample image or upload your own via the Media Explorer
  const img = cld
    .image(publicID)
    .format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
    .effect(removeBackground())
    .quality("auto");
  // .resize(auto().gravity(autoGravity()).width(300).height(300)); // Transform the image: auto-crop to square aspect_ratio

  return <AdvancedImage className="w-[20rem]" cldImg={img} />;
};

export default ClodinaryImg;
