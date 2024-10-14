/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/router'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

// Prisma 클라이언트 생성

export default function CategoryDetail() {
    const [priorities, setPriorities] = useState([]) // 우선 순위 상태 추가
    const [categories, setCategories] = useState([]) // 우선 순위 상태 추가

    const router = useRouter()

    const idx = Number(router.query.categoryIdx)

    const me = useQuery({
        queryKey: ['me'],
        queryFn: async () => await axios.get('/api/me'),
    })
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

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/category') // 우선 순위 API 호출
                setCategories(response.data) // 우선 순위 데이터를 상태에 저장
            } catch (error) {
                console.error('Error fetching priorities:', error)
            }
        }
        fetchCategories()
    }, [])

    const { data: projects, refetch } = useQuery({
        queryKey: ['projects', idx], // Unique query key for this category
        queryFn: async () => {
            if (idx) {
                const response = await axios.get(`/api/category/${idx}`) // API에서 해당 카테고리의 프로젝트를 가져옵니다.
                return response.data // 프로젝트 상태를 업데이트합니다.
            }
            return []
        },
        enabled: !!idx, // idx가 있을 때만 쿼리 실행
    })

    // 해당 카테고리의 프로젝트를 가져오기

    // 새 프로젝트 생성 뮤테이션
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
            refetch() // 프로젝트 생성 후 데이터 불러오기
        },
        onError: (error: Error) => {
            alert('Error creating project: ' + error.message)
            console.error('Project creation failed:', error.message)
        },
    })

    // 프로젝트 생성 처리 함수
    const handleCreateProject = (e: any) => {
        e.preventDefault()
        const title = e.target.title.value
        const priorityIdx = e.target.priorityIdx.value

        if (!title || !priorityIdx) {
            alert('Please enter both title and priority.')
            return
        }

        const categoryIdx = idx
        createProjectMutation.mutate({
            title,
            categoryIdx,
            priorityIdx: Number(priorityIdx), // priorityIdx를 숫자로 변환
        })
    }

    const category = categories.find((category) => category.idx === idx)

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
                {/*category 변수는 비동기적으로 업데이트되므로 물음표 붙이기..*/}
                <h1>Category {category?.title || 'Unknown'} Projects</h1>
                <ul className="project-list">
                    {projects?.map((project) => {
                        // 프로젝트의 우선순위의 label 찾기
                        const priorityLabel =
                            priorities.find(
                                (priority) =>
                                    priority.idx === project.priorityIdx // project의 priorityIdx를 사용
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

            {/* 프로젝트 생성 폼 */}
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
            <button
                className="mb-[10px] w-[400px] text-end"
                onClick={() => router.back()}
            >
                뒤로가기
            </button>
        </>
    )
}
