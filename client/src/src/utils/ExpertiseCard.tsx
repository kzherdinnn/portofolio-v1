import { FaBolt, FaBrain, FaSolarPanel, FaAutoprefixer } from "react-icons/fa";
import { GiElectric } from "react-icons/gi";
import { FaChartLine } from "react-icons/fa"; 
import Animate from "./animations/Animate";

interface ExpertiseCardInterface {
  icon: "SUBSTATION" | "MATLAB" | "AI" | "RENEWABLE" | "POWER" | "CAD";
  heading: string;
  headingContemt: string;
  desc: string;
}

function ExpertiseCard({
  desc,
  heading,
  headingContemt,
  icon,
  delay,
}: ExpertiseCardInterface & { delay: number }) {
  return (
    <Animate delay={delay}>
      <div className="border-2 border-foreground/50 px-8 py-10 hover:border-primary/50 transition-colors duration-300">
        <div className="flex gap-6">
          {icon === "SUBSTATION" ? (
            <FaBolt className="h-14 w-14 text-yellow-400" />
          ) : icon === "MATLAB" ? (
            <FaChartLine className="h-14 w-14 text-orange-500" />
          ) : icon === "AI" ? (
            <FaBrain className="h-14 w-14 text-purple-500" />
          ) : icon === "RENEWABLE" ? (
            <FaSolarPanel className="h-14 w-14 text-green-500" />
          ) : icon === "POWER" ? (
            <GiElectric className="h-14 w-14 text-blue-500" />
          ) : (
            <FaAutoprefixer className="h-14 w-14 text-red-500" />
          )}
          <div className="flex flex-col gap-1 text-xl font-semibold">
            <div className="w-fit text-xl">
              <h2 className="z-[301]">{heading}</h2>
              <div
                className={`z-[200] -mt-2 w-full h-[0.3rem] ${
                  icon === "SUBSTATION"
                    ? "bg-yellow-400"
                    : icon === "MATLAB"
                    ? "bg-orange-500"
                    : icon === "AI"
                    ? "bg-purple-500"
                    : icon === "RENEWABLE"
                    ? "bg-green-500"
                    : icon === "POWER"
                    ? "bg-blue-500"
                    : "bg-red-500"
                }`}
              ></div>
            </div>
            <h2 className="text-primary">{headingContemt}</h2>
          </div>
        </div>

        <div className="flex mt-4 justify-center items-center">
          <div className="flex flex-col items-center h-full ">
            <label className="text-2xl">{`⚡️`}</label>
            <div className="w-[0.1rem] h-[21vh] lg:h-[12vh] bg-foreground/10"></div>
            <label className="text-2xl">{`⚡️`}</label>
          </div>
          <div className="pl-4">
            <p className="text-foreground/80">{desc}</p>
          </div>
        </div>
      </div>
    </Animate>
  );
}

export default ExpertiseCard;