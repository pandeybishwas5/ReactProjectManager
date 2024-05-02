import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjects from "./components/NoProjects";
import ProjectsSideBar from "./components/ProjectsSideBar";


function App() {


  const [ projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function  handleAddProject() {
    setProjectState( prevState => {
      return{
        ...prevState,
        selectedProjectId: null,
      };
      
    });
  }
  
  function handleCancelAddProject(){
    setProjectState( prevState => {
      return{
        ...prevState,
        selectedProjectId: undefined,
      };
      
    });
  }


  function handleSaveProject(projectData) {
    setProjectState( prevState => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      }
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  let content;

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleSaveProject} onCancel={handleCancelAddProject} />;
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjects onStartAddProject= {handleAddProject} />
  }
  
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSideBar onStartAddProject= {handleAddProject} projects={projectState.projects}/>
      {content}
    </main>
  );
}

export default App;
