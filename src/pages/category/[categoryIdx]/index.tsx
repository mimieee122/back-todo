/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/router'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function CategoryDetail() {
    const [editingProject, setEditingProject] = useState<number | null>(null)
    // Create Project 상태
    const [createTitle, setCreateTitle] = useState('')
    const [createPriorityIdx, setCreatePriorityIdx] = useState('')

    // Update Project 상태
    const [editTitle, setEditTitle] = useState('')
    const [editPriorityIdx, setEditPriorityIdx] = useState('')

    const [priorities, setPriorities] = useState([])
    const [categories, setCategories] = useState([])

    const router = useRouter()
    const idx = Number(router.query.categoryIdx)

    const { data: me } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const response = await axios.get('/api/me')
            return response.data
        },
    })

    useEffect(() => {
        const fetchPriorities = async () => {
            try {
                const response = await axios.get('/api/priority')
                setPriorities(response.data)
            } catch (error) {
                console.error('Error fetching priorities:', error)
            }
        }
        fetchPriorities()
    }, [])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/category')
                setCategories(response.data)
            } catch (error) {
                console.error('Error fetching categories:', error)
            }
        }
        fetchCategories()
    }, [])

    const category = categories.find((category) => category.idx === idx)

    const { data: projects, refetch: refetchProjects } = useQuery({
        queryKey: ['projects', idx],
        queryFn: async () => {
            if (idx) {
                const response = await axios.get(`/api/category/${idx}`)
                return response.data
            }
            return []
        },
        enabled: !!idx,
    })

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
            setCreateTitle('')
            setCreatePriorityIdx('')
            refetchProjects()
        },
        onError: (error: Error) => {
            alert('Error creating project: ' + error.message)
            console.error('Project creation failed:', error.message)
        },
    })

    const handleCreateProject = (e: any) => {
        e.preventDefault()
        const title = e.target.createTitle.value
        const priorityIdx = e.target.createPriorityIdx.value

        if (!title || !priorityIdx) {
            alert('Please enter both title and priority.')
            return
        }

        const categoryIdx = idx
        createProjectMutation.mutate({
            title: String(title),
            categoryIdx,
            priorityIdx: Number(priorityIdx),
        })
    }

    const updateProjectMutation = useMutation({
        mutationFn: async (data: { title: string; priorityIdx: number }) => {
            const projectIdx = Number(editingProject)
            await axios.put(`/api/project/${projectIdx}`, data)
        },
        onSuccess: () => {
            // 업데이트 후 상태 초기화
            setEditTitle('')
            setEditPriorityIdx('')
            setEditingProject(null)
            refetchProjects()
        },
        onError: (error: any) => {
            alert(error.response?.data?.message || 'Error updating project.')
        },
    })
    const handleUpdateProject = (e: any) => {
        e.preventDefault()
        const title = e.target.editTitle.value
        const priorityIdx = e.target.editPriorityIdx.value

        if (!title && !priorityIdx) {
            alert('Please provide title or priority.')
            return
        }

        if (editingProject === null) {
            alert('No project is being edited.')
            return
        }

        updateProjectMutation.mutate({
            title: String(title),
            priorityIdx: Number(priorityIdx),
        })
    }

    const deleteProjectMutation = useMutation({
        mutationFn: async (data: { projectIdx: number }) => {
            await axios.delete(`/api/project/${data.projectIdx}`)
        },
        onSuccess: () => {
            refetchProjects()
        },
    })

    const handleDeleteProject = (projectIdx: number) => {
        deleteProjectMutation.mutate({
            projectIdx: Number(projectIdx),
        })
    }

    const renderPriorityBoard = (priorityLabel: string) => {
        return (
            <div className="relative w-[400px] h-[400px] justify-center items-center overflow-y-auto shadow-[0_0_10px_white] transition-shadow rounded-xl bg-white bg-opacity-15 border-[#ffbd43] border-[2px] border-solid">
                {/* 중요도 이미지 */}
                <div className="flex flex-col mt-[50px] justify-center items-center relative">
                    <div className="absolute z-10 w-[150px] h-[80px] ">
                        <Image
                            src="/assets/images/medium.png"
                            fill
                            alt="중요도"
                            className="object-contain"
                        />
                    </div>
                </div>
                <h2 className="text-center text-[15px] mt-[20px] text-white mb-[10px]">
                    {priorityLabel}
                </h2>
                <ul className="project-list flex flex-col gap-[5px]">
                    {projects
                        ?.filter(
                            (project) =>
                                priorities.find(
                                    (priority) =>
                                        priority.idx === project.priorityIdx
                                )?.label === priorityLabel
                        )
                        .map((project) => (
                            <li
                                key={project.idx}
                                className="task flex flex-row gap-[10px] mt-[10px]"
                            >
                                {editingProject === project.idx ? (
                                    <form
                                        onSubmit={(e) => handleUpdateProject(e)}
                                        className="flex flex-row gap-[10px]"
                                    >
                                        <input
                                            type="text"
                                            value={editTitle}
                                            name="editTitle"
                                            onChange={(e) =>
                                                setEditTitle(e.target.value)
                                            }
                                        />
                                        <select
                                            value={editPriorityIdx}
                                            name="editPriorityIdx"
                                            onChange={(e) =>
                                                setEditPriorityIdx(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {priorities.map((priority) => (
                                                <option
                                                    key={priority.idx}
                                                    value={priority.idx}
                                                >
                                                    {priority.label}
                                                </option>
                                            ))}
                                        </select>
                                        <button type="submit">Update</button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setEditingProject(null)
                                            }
                                        >
                                            Cancel
                                        </button>
                                    </form>
                                ) : (
                                    <div className="flex flex-row border-[1px] p-3 text-[15px] hover:shadow-[0_0_15px_white]  shadow-[0_0_10px_white] transition-shadow rounded-xl bg-white bg-opacity-15 border-[#f13857] border-solid justify-between items-center w-full">
                                        <div> - {project.title}</div>
                                        <div className="flex  gap-[10px]">
                                            <button
                                                className="text-[white]"
                                                onClick={() =>
                                                    setEditingProject(
                                                        project.idx
                                                    )
                                                }
                                            >
                                                수정
                                            </button>
                                            <button
                                                className="text-[white]"
                                                onClick={() =>
                                                    handleDeleteProject(
                                                        project.idx
                                                    )
                                                }
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                </ul>
            </div>
        )
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
                        USER: {me.data?.nickname}
                    </p>
                </div>
                <div className="flex flex-row mt-[10px] text-[18px] gap-[30px]">
                    <Link href="/category">
                        <button className="text-[#fff983]">CATEGORY</button>
                    </Link>

                    <Link href="/">
                        <button>HOME</button>
                    </Link>
                </div>
            </nav>

            <div className="flex flex-col items-center justify-center">
                <h1 className="text-[70px] mt-[40px] font-thin mb-[20px] category text-[#ffbd43]">
                    To Do {category?.title || 'Unknown'}
                </h1>

                <div className="flex flex-row relative gap-[35px]">
                    {renderPriorityBoard('High')}
                    {renderPriorityBoard('Medium')}
                    {renderPriorityBoard('Low')}
                </div>
            </div>

            {/* 프로젝트 생성 폼 */}
            <div className="flex flex-row justify-center items-center mt-[30px]">
                <form
                    className="flex flex-col items-center w-[1300px] p-4 rounded-sm bg-white bg-opacity-10"
                    onSubmit={handleCreateProject}
                >
                    <div className="flex flex-row gap-[20px]">
                        <input
                            className="p-[10px] rounded-md text-black text-[20px]"
                            type="text"
                            value={createTitle}
                            name="createTitle"
                            onChange={(e) => setCreateTitle(e.target.value)}
                            placeholder="Enter to-do"
                        />
                        <select
                            className="p-[10px] rounded-md"
                            value={createPriorityIdx}
                            name="createPriorityIdx"
                            onChange={(e) =>
                                setCreatePriorityIdx(e.target.value)
                            }
                        >
                            {priorities.map((priority) => (
                                <option key={priority.idx} value={priority.idx}>
                                    {priority.label}
                                </option>
                            ))}
                        </select>
                        <button
                            className="bg-[#ffbd43] text-white p-[10px] rounded-md shadow-[0_0_10px_#fff983] transition-shadow"
                            type="submit"
                        >
                            CREATE
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
