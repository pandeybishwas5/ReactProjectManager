import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjects from "./components/NoProjects";
import ProjectsSideBar from "./components/ProjectsSideBar";
import SelectedProject from "./components/SelectedProject";


function App() {


  const [ projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text){
    setProjectState( prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      return{
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      }
    })
  }

  function handleDeleteTask(id){
    setProjectState(prevState => {
      return{
        ...prevState,
        tasks: prevState.tasks.filter(task => task.id !== id),
      }; 
    })
  }

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

  function handleSelectProject(id) {
    setProjectState(prevState => {
      return{
        ...prevState,
        selectedProjectId: id,
      }; 
    })
  }

  function handleDeleteProject() {
    setProjectState(prevState => {
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId),
      }; 
    })
  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId)
  let content = 
  <SelectedProject 
    project={selectedProject} 
    onDelete={handleDeleteProject} 
    onAddTask={handleAddTask} 
    onDeleteTask={handleDeleteTask}
    tasks={projectState.tasks}
  />;
  
  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleSaveProject} onCancel={handleCancelAddProject} />;
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjects onStartAddProject= {handleAddProject} />
  } 
  
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSideBar 
        onStartAddProject= {handleAddProject} 
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
