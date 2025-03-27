import { Carousel } from "@/components/ui/carousel";
import { slideData, slideDataBook } from "@/data/showsData";

const Shows = () => {
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
};

export default Shows;

export const Books = () => {
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideDataBook} />
    </div>
  );
};
