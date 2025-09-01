import { useIsLoading } from "@/store/useIsLoading";
import { IPhoto } from "./PhotoComponent";
import { useEffect } from "react";
import Image from "next/image";
import { urlForTex } from "@/sanity/lib/image";

function MobilePhotoComponent({
  photos,
  isPhotoVisible,
}: {
  photos: IPhoto[];
  isPhotoVisible: boolean;
}) {
  const { setIsPhotoCanvasLoading } = useIsLoading();

  useEffect(() => {
    setIsPhotoCanvasLoading(false);
  }, [setIsPhotoCanvasLoading]);
  return (
    <div
      className={`bg-black w-full px-5 flex-col space-y-50 pt-20 pb-80 ${isPhotoVisible ? "flex" : "hidden"}`}
    >
      {photos.map((photo, index) => (
        <OneMobilePhoto key={index} index={index} photo={photo} />
      ))}
    </div>
  );
}

export default MobilePhotoComponent;

function OneMobilePhoto({ photo, index }: { photo: IPhoto; index: number }) {
  return (
    <div>
      <div
        className={`${photo.formats === "vertical" ? "h-[600px]" : "h-[300px] md:h-[600px]"} relative overflow-hidden`}
      >
        <Image
          src={urlForTex(photo.image, { w: 900, q: 80 })}
          alt={photo.name || `Photo${index + 1}`}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <p className="mt-2 text-sm">{photo.date}</p>
    </div>
  );
}
