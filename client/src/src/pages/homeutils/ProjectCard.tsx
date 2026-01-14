import { LuMoveRight } from "react-icons/lu";

interface ProjectCardInterface {
  image: string;
  title: string;
  category: string;
  callBack:()=>void
}

function ProjectCard({ category, image, title,callBack }: ProjectCardInterface) {
  return (
    <div onClick={callBack} className="lg:h-full  relative rounded-md lg:w-[25vw]  bg-background/40  group cursor-pointer">
      <div className="">
        <img
          src={image}
          className=" w-[90vw]  lg:h-[30vh] object-fill rounded-t-md  transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>

      <div className=" px-8 pt-6 lg:pt-2  bg-opacity-10 rounded-b-md relative">
        <div className="font-bold text-2xl ">{title}</div>
        <div className="flex items-center text-foreground/50  opacity-100 translate-y-3 transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:translate-y-0">{category}</div>
        <div className="flex items-center  text-foreground/50   opacity-0 translate-y-10 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:-translate-y-6">
          Show Project <LuMoveRight className=" text-foreground/50  w-8 h-8 ml-4" />
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
