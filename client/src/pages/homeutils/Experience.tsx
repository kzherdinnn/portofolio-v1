import Animate from "../../utils/animations/Animate";
import { FaLocationDot } from "react-icons/fa6";

function Experience() {
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

        {/* Software Engineering Intern */}
        <div className="mt-[5vh] flex flex-col gap-2 lg:w-[70vw]">
          <Animate delay={300} type="slideLeft">
            <div className="relative bg-blue-700 py-5 w-full flex flex-col lg:flex-row lg:items-center rounded-md px-6 font-semibold lg:gap-5">
              <div className="lg:text-nowrap">Software Engineering Intern</div>
              <div className="font-this text-foreground/80 text-sm w-full flex">
                @ Tech Innovators Inc. <br className="lg:hidden" /> Jun 2025 - Present
              </div>
            </div>
          </Animate>

          <Animate delay={400} type="slideLeft">
            <div className="w-full px-6 py-3 bg-white rounded-md flex flex-col gap-5">
              <div className="flex flex-col gap-3 lg:flex-row">
                <div>
                  <img src="tech-company.png" className="lg:ml-2 rounded-md w-42 h-20 object-cover" />
                </div>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                  <div className="flex items-center text-black">
                    <FaLocationDot className="w-5 h-6 text-black mr-3" /> Jakarta, Indonesia
                  </div>
                </div>
              </div>
              <div>
                <div className="lg:max-w-[50vw] text-black">
                  Developed and maintained full-stack web applications using React and Node.js.
                  Collaborated with cross-functional teams to implement new features and optimize
                  application performance. Reduced API response time by 40% through database query optimization.
                </div>
              </div>
              <div className="flex flex-wrap flex-grow justify-between gap-3">
                <div className="w-fit h-fit py-2 px-5 rounded-full bg-blue-700">
                  React.js
                </div>
                <div className="w-fit h-fit py-2 px-5 rounded-full bg-blue-700">
                  Node.js
                </div>
                <div className="w-fit h-fit py-2 px-5 rounded-full bg-blue-700">
                  MongoDB
                </div>
                <div className="w-fit h-fit py-2 px-5 rounded-full bg-blue-700">
                  REST API
                </div>
                <div className="w-fit h-fit py-2 px-5 rounded-full bg-blue-700">
                  Git
                </div>
              </div>
            </div>
          </Animate>
        </div>

        {/* AI Research Assistant */}
        <div className="mt-[5vh] flex flex-col gap-2 lg:w-[70vw]">
          <Animate delay={500} type="slideLeft">
            <div className="relative bg-green-700 py-5 w-full flex flex-col lg:flex-row lg:items-center rounded-md px-6 font-semibold lg:gap-5">
              <div className="lg:text-nowrap">AI Research Assistant</div>
              <div className="font-this text-foreground/80 text-sm w-full flex">
                @ University AI Lab <br className="lg:hidden" /> Jan 2025 - May 2025
              </div>
            </div>
          </Animate>

          <Animate delay={400} type="slideLeft">
            <div className="w-full px-6 py-3 bg-green-200 rounded-md flex flex-col gap-5">
              <div className="flex flex-col gap-3 lg:flex-row">
                <div>
                  <img src="university-logo.png" className="rounded-md w-42 h-20 object-contain" />
                </div>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                  <div className="flex items-center text-black">
                    <FaLocationDot className="w-5 h-6 text-black mr-3" /> Bandung, Indonesia
                  </div>
                </div>
              </div>
              <div>
                <div className="lg:max-w-[50vw] text-black">
                  Conducted research on deep learning models for computer vision tasks.
                  Implemented CNN and transformer architectures for image classification,
                  achieving 95%+ accuracy on benchmark datasets. Published findings in university journal.
                </div>
              </div>
              <div className="flex flex-wrap flex-grow justify-between gap-3">
                <div className="w-fit h-fit py-2 px-5 rounded-full bg-blue-700">
                  Python
                </div>
                <div className="w-fit h-fit py-2 px-5 rounded-full bg-blue-700">
                  TensorFlow
                </div>
                <div className="w-fit h-fit py-2 px-5 rounded-full bg-blue-700">
                  PyTorch
                </div>
                <div className="w-fit h-fit py-2 px-5 rounded-full bg-blue-700">
                  Computer Vision
                </div>
                <div className="w-fit h-fit py-2 px-5 rounded-full bg-blue-700">
                  Research
                </div>
              </div>
            </div>
          </Animate>
        </div>

        {/* Mobile Developer Intern */}
        <div className="mt-[5vh] flex flex-col gap-2 lg:w-[70vw]" >
          <Animate delay={300} type="slideLeft">
            <div className="relative bg-[#740cdc] py-5 w-full flex flex-col lg:flex-row lg:items-center rounded-md px-6 font-semibold lg:gap-5">
              <div className="lg:text-nowrap">Mobile Developer Intern</div>
              <div className="font-this text-foreground/60 text-sm w-full flex">
                @ StartupHub Indonesia <br className="lg:hidden" /> Aug 2024 - Dec 2024
              </div>
            </div>
          </Animate>

          <Animate delay={400} type="slideLeft">
            <div className="w-full px-6 py-3 bg-secondary/30 rounded-md flex flex-col gap-5">
              <div className="flex flex-col gap-3 lg:flex-row">
                <div>
                  <img src="startup-logo.png" className="rounded-md w-42 h-20 object-contain" />
                </div>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                  <div className="flex items-center text-foreground/70">
                    <FaLocationDot className="w-5 h-6 text-secondary mr-3" /> Surabaya, Indonesia
                  </div>
                </div>
              </div>
              <div>
                <div className="lg:max-w-[50vw]">
                  Developed cross-platform mobile applications using React Native and Flutter.
                  Implemented features including user authentication, real-time notifications,
                  and offline data synchronization. Collaborated with UI/UX team to create intuitive interfaces.
                </div>
              </div>
              <div className="flex flex-wrap flex-grow justify-between gap-3">
                <div className="w-fit h-fit py-2 px-5 rounded-full bg-blue-700">
                  React Native
                </div>
                <div className="w-fit h-fit py-2 px-5 rounded-full bg-blue-700">
                  Flutter
                </div>
                <div className="w-fit h-fit py-2 px-5 rounded-full bg-blue-700">
                  Firebase
                </div>
                <div className="w-fit h-fit py-2 px-5 rounded-full bg-blue-700">
                  Redux
                </div>
                <div className="w-fit h-fit py-2 px-5 rounded-full bg-blue-700">
                  UI/UX
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </div>
    </div>
  );
}

export default Experience;