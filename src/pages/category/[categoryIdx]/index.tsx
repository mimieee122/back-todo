/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/router'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import Image from 'next/image'

const categories = [
    { idx: 1, title: 'Study' },
    { idx: 2, title: 'Exercise' },
    { idx: 3, title: 'Routine' },
    { idx: 4, title: 'Hobby' },
    { idx: 5, title: 'Shopping' },
]

const priorities = [
    { idx: 1, label: 'High' },
    { idx: 2, label: 'Medium' },
    { idx: 3, label: 'Low' },
]

export default function CategoryDetail() {
    const router = useRouter()
    const { categoryIdx } = router.query
    const idx = Number(categoryIdx)

    const { data: me } = useQuery({
        queryKey: ['me'],
        queryFn: async () => await axios.get('/api/me'),
    })

    // Fetch the projects for the current category
    const { data: projects = [], refetch } = useQuery({
        queryKey: ['projects', idx],
        queryFn: async () => {
            if (!idx) return []
            const response = await axios.get(`/api/category/${idx}`)
            return response.data
        },
        enabled: !!idx, // Run query only if idx is available
    })

    // Mutation to create a new project
    const createProjectMutation = useMutation({
        mutationFn: async (data: {
            title: string
            categoryIdx: number
            priorityIdx: number
        }) => {
            try {
                await axios.post(`/api/category/${data.categoryIdx}`, data)
            } catch (error: any) {
                const errorMsg =
                    error.response?.data?.message || 'Error creating project.'
                alert(errorMsg)
                console.error('An error occurred:', error)
            }
        },
        onSuccess: () => {
            refetch() // Refetch projects after successful creation
        },
        onError: (error: Error) => {
            alert('Error creating project: ' + error.message)
            console.error('Project failed:', error.message)
        },
    })

    // Handle form submission to create a project
    const handleCreateProject = (e: any) => {
        e.preventDefault()
        const title = e.target.title.value
        const priorityIdx = e.target.priorityIdx.value

        if (!title || !priorityIdx) {
            alert('Please enter both title and priority.')
            return
        }

        const categoryIdx = idx // Category index from the router
        createProjectMutation.mutate({
            title,
            categoryIdx,
            priorityIdx: Number(priorityIdx), // Ensure the value is a number
        })
    }

    if (!me) {
        return <div>Loading user information...</div> // Loading state for user data
    }

    return (
        <>
            <nav className="flex flex-row justify-between p-[10px] pl-[20px] pr-[20px] bg-white bg-opacity-5">
                <div className="flex flex-row gap-[10px]">
                    <div className="relative flex flex-col gap-0 items-start w-[30px] h-[30px] mt-[8px] overflow-hidden">
                        <Image
                            src="/assets/images/profile.png"
                            fill
                            alt="Profile picture"
                            className="object-fill"
                        />
                    </div>
                    <p className="text-[18px] mt-[7px]">
                        USER: {me.data?.data?.nickname}
                    </p>
                </div>
                <div className="flex flex-row mt-[10px] text-[18px] gap-[30px]">
                    <Link href="/">
                        <button>HOME</button>
                    </Link>
                    <Link href="/signUp">
                        <button>Sign Up</button>
                    </Link>
                </div>
            </nav>

            <div>
                {/* Display projects for the current category */}
                {categories
                    .filter((category) => category.idx === idx) // Filter categories based on categoryIdx
                    .map((category) => (
                        <div key={category.idx}>
                            <h1>Category {category.title} Projects</h1>
                            {projects
                                .filter(
                                    (project) =>
                                        project.categoryIdx === category.idx
                                ) // Filter projects for this category
                                .map((project) => {
                                    // Find the priority label
                                    const priority = priorities.find(
                                        (priority) =>
                                            priority.idx === project.priorityIdx
                                    )
                                    const priorityLabel = priority
                                        ? priority.label
                                        : 'Unknown'

                                    return (
                                        <li
                                            key={project.idx}
                                            className="task flex flex-row gap-[10px]"
                                        >
                                            <div>{project.title}</div>
                                            <div>{priorityLabel}</div>
                                        </li>
                                    )
                                })}
                            {projects.filter(
                                (project) =>
                                    project.categoryIdx === category.idx
                            ).length === 0 && (
                                <h2>
                                    No projects available for this category.
                                </h2> // Message when no projects are present
                            )}
                        </div>
                    ))}
            </div>

            {/* Project creation form */}
            <form onSubmit={handleCreateProject}>
                <div className="write text-white mb-0 text-[35px]">WRITE</div>
                <label htmlFor="title"></label>
                <input
                    className="text-black"
                    type="text"
                    id="title"
                    name="title"
                    placeholder="TITLE"
                    required
                />
                <select name="priorityIdx" required>
                    {priorities.map((priority) => (
                        <option key={priority.idx} value={priority.idx}>
                            {priority.label}
                        </option>
                    ))}
                </select>
                <button type="submit">Create Project</button>
            </form>
        </>
    )
}
