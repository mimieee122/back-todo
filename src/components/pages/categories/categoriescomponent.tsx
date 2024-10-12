import { useRouter } from 'next/router'
import { useState } from 'react'

const categories = [
    { categoryIdx: 1, name: 'Study', projects: [] },
    { categoryIdx: 2, name: 'Exercise', projects: [] },
    { categoryIdx: 3, name: 'Routine', projects: [] },
    { categoryIdx: 4, name: 'Hobby', projects: [] },
    { categoryIdx: 5, name: 'Shopping', projects: [] },
]

export default function CategoriesComponent() {
    const router = useRouter()

    const [draggedProject, setDraggedProject] = useState(null)

    // Handle dragging a project
    const handleDragStart = (project) => {
        setDraggedProject(project)
    }

    // Handle dropping a project into a category
    const handleDrop = (categoryIdx) => {
        if (draggedProject) {
            console.log(
                `Dropped project: ${draggedProject} into category: ${categoryIdx}`
            )
            // Here you would update the backend or state to reflect the new project category
            setDraggedProject(null)
        }
    }

    const handleCategoryClick = (categoryIdx) => {
        router.push(`/categories/${categoryIdx}`)
    }

    return (
        <div>
            <ul className="flex flex-row justify-center gap-[30px]">
                {categories.map((category) => (
                    <li
                        className="w-[250px] h-[250px] text-center text-[20px] font-extrabold bg-white bg-opacity-10 border-solid border-[1px] rounded-xl border-black"
                        key={category.categoryIdx}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(category.categoryIdx)}
                    >
                        <button
                            onClick={() => {
                                handleCategoryClick(category.categoryIdx)
                            }}
                        >
                            {category.name}
                        </button>

                        {/* Projects inside the category */}
                        <ul>
                            {category.projects.map((project, idx) => (
                                <li
                                    key={idx}
                                    draggable
                                    onDragStart={() => handleDragStart(project)} // Attach drag start handler
                                    className="p-2 mt-2 bg-gray-200 border rounded-md"
                                >
                                    {project}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}
