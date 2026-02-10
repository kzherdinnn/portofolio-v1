import { FaGithub, FaInstagram } from "react-icons/fa";
import Animate from "../../utils/animations/Animate";
import { CiLinkedin } from "react-icons/ci";

function BottomNav() {
  function handleOpenSocialLink(type: string) {
    switch (type) {
      case "GITHUB":
        window.open("https://github.com/kzherdinnn");
        break;
      case "LINKEDIN":
        window.open(
          "https://www.linkedin.com/in/kzherdinnn/"
        );
        break;
      case "INSTAGRAM":
        window.open(
          "https://www.instagram.com/kzherdinnn/"
        );
        break;
    }
  }

  function handleEmailClick() {
    const mailtoUrl =
      "mailto:kzherdin03@gmail.com?subject=Project Collaboration";
    window.open(mailtoUrl);
  }

  return (
    <div className="w-full flex flex-col px-4 items-center justify-center mt-[5vh]">
      <div className="flex flex-col gap-10 lg:gap-3 text-center">
        <Animate delay={200} type="slideLeft">
          <h1 className="text-2xl lg:text-[40px] font-semibold">
            Available for freelance projects and collaboration
          </h1>
        </Animate>
        <Animate delay={400} type="slideLeft">
          <p className="text-gray-400 lg:text-md">
            Need a full-stack developer, data scientist, or mobile app developer? Let's work together to bring your ideas to life.
          </p>
        </Animate>
      </div>

      <Animate delay={500} type="slideLeft">
        <div className="mt-[5vh]">
          <div
            onClick={handleEmailClick}
            className="text-xl border-b-4 border-secondary cursor-pointer lg:hover:scale-105 lg:hover:text-primary"
          >
            kzherdin03@gmail.com
          </div>

          <div className="text-center mt-[3vh] flex items-center justify-center gap-4">
            <h3
              onClick={() => handleOpenSocialLink("LINKEDIN")}
              className="flex items-center bg-foreground/10 rounded-md px-3 py-2 cursor-pointer lg:hover:bg-foreground/20 lg:hover:scale-105"
            >
              <CiLinkedin className="h-6 w-5" />
            </h3>
            <h3
              onClick={() => handleOpenSocialLink("GITHUB")}
              className="flex items-center bg-foreground/10 rounded-md px-3 py-2 cursor-pointer lg:hover:bg-foreground/20 lg:hover:scale-105"
            >
              <FaGithub className="h-6 w-5" />
            </h3>
            <h3
              onClick={() => handleOpenSocialLink("INSTAGRAM")}
              className="flex items-center bg-foreground/10 rounded-md px-3 py-2 cursor-pointer lg:hover:bg-foreground/20 lg:hover:scale-105"
            >
              <FaInstagram className="h-6 w-5" />
            </h3>
          </div>
        </div>
      </Animate>

      <div className="w-full mt-[9vh] mb-1">
        <Animate delay={200} type="slideDown">
          <div className="w-full flex flex-col gap-2 lg:flex-row lg:justify-between lg:px-20">
            <div className="flex items-center justify-center text-foreground/40 text-xs lg:text-md">
              © 2026.
              <a
                href="mailto:kzherdin03@gmail.com?subject=Project Collaboration"
                className="ml-1 font-semibold text-blue-600 border-b border-blue-600"
              >
                HerdinKz
              </a>{" "}
              – Software Engineer
            </div>

            <div className="flex flex-col gap-2 mb-10 text-center items-center justify-center text-foreground/40 text-xs lg:text-md font-mono">
              <div>Full-Stack Developer | Data Science | NLP | Mobile | QA</div>
              <div className="flex items-center">
                Built with React + Node.js + MongoDB
              </div>
            </div>
          </div>
        </Animate>
      </div>
    </div>
  );
}

export default BottomNav;
