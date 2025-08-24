import { AboutSettings } from "@/sanity/types/about";
import { useIsSelectedLanguage } from "@/store/useSelectedLanguage";

function Section4({ about }: { about: AboutSettings }) {
  const { selectedLanguage } = useIsSelectedLanguage();
  return (
    <>
      {about.clientComments && (
        <div className="space-y-10 lg:flex lg:flex-wrap lg:items-start lg:w-6/12">
          {about.clientComments.map((comment, index) => (
            <div
              key={index}
              className="border-b lg:border-b-0 lg:border-l border-dashed  py-5 px-5 flex flex-col space-y-5 lg:h-[200px] "
            >
              <p className="font-bold text-lg">{comment.name}</p>
              <p>
                {selectedLanguage === "fr"
                  ? (comment.comment.fr as string)
                  : (comment.comment.en as string)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Section4;
