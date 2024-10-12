import { useRouter } from 'next/router'

const categories = [
    {
        categoryIdx: 1,
        name: 'Study',
        projects: [{ idx: '1', priorityIdx: 1, title: 'Math Assignment' }],
    },
    { categoryIdx: 2, name: 'Exercise', projects: [] },
    { categoryIdx: 3, name: 'Routine', projects: [] },
    { categoryIdx: 4, name: 'Hobby', projects: [] },
    { categoryIdx: 5, name: 'Shopping', projects: [] },
]

export default function CategoriesComponent() {
    const router = useRouter()

    // Handle the form submission to create a new project

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
                    >
                        <button
                            onClick={() =>
                                handleCategoryClick(category.categoryIdx)
                            }
                        >
                            {category.name}
                        </button>

                        {/* Projects inside the category */}
                        <ul>
                            {category.projects.map((project) => (
                                <li
                                    key={project.idx} // Assuming project has a unique projectIdx
                                    className="p-2 mt-2 bg-gray-200 border rounded-md"
                                >
                                    {project.title}{' '}
                                    {/* Displaying project title */}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}
