/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/router'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function CategoryDetail() {
    const router = useRouter()
    const { categoryIdx } = router.query
    const idx = Number(categoryIdx)
    const [priorities, setPriorities] = useState([]) // 우선 순위 상태 추가

    // Fetch the projects for the current category
    const { data: projects, refetch } = useQuery({
        queryKey: ['projects', idx],
        queryFn: async () => {
            if (!idx) return []
            const response = await axios.get(`/api/category/${idx}`)
            return response.data
        },
        enabled: !!idx, // Run query only if idx is available
    })

    // Fetch priorities from the API
    useEffect(() => {
        const fetchPriorities = async () => {
            try {
                const response = await axios.get('/api/priority') // 우선 순위 API 호출
                setPriorities(response.data) // 우선 순위 데이터를 상태에 저장
            } catch (error) {
                console.error('Error fetching priorities:', error)
            }
        }

        fetchPriorities()
    }, [])

    // Mutation to create a new project
    const createProjectMutation = useMutation({
        mutationFn: async (data: {
            title: string
            categoryIdx: number
            priorityIdx: number
        }) => {
            const idx = data.categoryIdx

            try {
                await axios.post(`/api/category/${idx}`, data)
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
            alert('왜안될까요')
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
                    {/* <p className="text-[18px] mt-[7px]">
                        USER: {me.data?.data?.nickname}
                    </p> */}
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
                <h1>Category {idx} Projects</h1>
                <ul className="project-list">
                    {projects?.map((project) => {
                        // 우선순위의 label 찾기
                        const priorityLabel =
                            priorities.find(
                                (priority) =>
                                    priority.idx === project.priorityIdx
                            )?.label || 'Unknown'
                        return (
                            <li key={project.idx} className="task">
                                <div>{project.title}</div>
                                <div>{priorityLabel}</div>{' '}
                                {/* 여기서 label을 사용 */}
                            </li>
                        )
                    })}
                </ul>
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
