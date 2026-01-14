import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';


export function useUpdateProjectDetails() {
  const navigate = useNavigate();

  function updateLocalStorage(value: string) {
    localStorage.setItem("selectedProject", value);
  }

  function updateProjectDetails(project: string) {
    updateLocalStorage(project);

    navigate("/projectdetail");
  }

  return { updateProjectDetails };
}



function useImageLoader() {
  useEffect(() => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.complete) {
        img.setAttribute('data-loaded', 'true');
      } else {
        img.addEventListener('load', () => {
          img.setAttribute('data-loaded', 'true');
        });
      }
    });
  }, []);
}

export default useImageLoader;
