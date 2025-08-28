import { useIsLoading } from "@/store/useIsLoading";
import { IPhoto } from "./PhotoComponent";
import { useEffect } from "react";

function MobilePhotoComponent({ photos }: { photos: IPhoto[] }) {
  const { setIsPhotoCanvasLoading } = useIsLoading();

  useEffect(() => {
    setIsPhotoCanvasLoading(false);
  }, [setIsPhotoCanvasLoading]);
  return (
    <div className="lg:hidden flex flex-col">
      {photos.map((photo, index) => (
        <div key={index} className="w-full mb-10 h-[200px] bg-red-200"></div>
      ))}
    </div>
  );
}

export default MobilePhotoComponent;
