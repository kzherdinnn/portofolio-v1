/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Animate from "../../utils/animations/Animate";
import { FaLocationDot } from "react-icons/fa6";
import { api } from "../../utils/api";

function Experience() {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await api.getExperience();
        setExperience(response.data);
      } catch (error) {
        console.error("Failed to fetch experience:", error);
      }
    };
    fetchExperience();
  }, []);

  return (
    <div>
      <div className=" px-4 flex flex-col justify-center items-center mt-[5vh] w-full ">
        <Animate delay={300} type="slideLeft">
          <div>
            <h2 className="text-4xl lg:text-[50px] font-semibold text-center">
              Professional Experience
            </h2>
          </div>
        </Animate>

        {experience.map((exp: any, index: number) => (
          <div key={index} className="mt-[5vh] flex flex-col gap-2 lg:w-[70vw]">
            <Animate delay={300 + (index * 100)} type="slideLeft">
              <div className="relative py-5 w-full flex flex-col lg:flex-row lg:items-center rounded-md px-6 font-semibold lg:gap-5" style={{ backgroundColor: exp.backgroundColor || '#1d4ed8' }}>
                <div className="lg:text-nowrap">{exp.role}</div>
                <div className="font-this text-foreground/80 text-sm w-full flex">
                  @ {exp.company} <br className="lg:hidden" /> {exp.period}
                </div>
              </div>
            </Animate>

            <Animate delay={400 + (index * 100)} type="slideLeft">
              <div className="w-full px-6 py-3 bg-white rounded-md flex flex-col gap-5">
                <div className="flex flex-col gap-3 lg:flex-row">
                  <div>
                    {exp.logo && <img src={exp.logo} className="lg:ml-2 rounded-md w-42 h-20 object-cover" />}
                  </div>
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                    <div className="flex items-center text-black">
                      <FaLocationDot className="w-5 h-6 text-black mr-3" /> {exp.location}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="lg:max-w-[50vw] text-black">
                    {exp.description}
                  </div>
                </div>
                <div className="flex flex-wrap flex-grow justify-between gap-3">
                  {exp.skills?.map((skill: string, idx: number) => (
                    <div key={idx} className="w-fit h-fit py-2 px-5 rounded-full bg-blue-700 text-white">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </Animate>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;