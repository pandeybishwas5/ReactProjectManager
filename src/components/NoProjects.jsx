import projectImage from '../assets/no-projects.png'
import Button from './Button.jsx'


export default function NoProjects( {onStartAddProject} ) {
    return (
        <div className="mt-24 text-center w-2/3">
            <img src={projectImage} alt="An empty task list" className='w-16 h-16 object-contain mx-auto'/>
            <h2 className='text-xl font-bold text-stone-500 my-4'>No Projects Selected</h2>
            <p className='text-stone-400 mb-4'>
                Select a project or get started with a new one
            </p>
            <p>
                <Button onClick={onStartAddProject} >Create a New Project</Button>
            </p>
        </div>
    )
}