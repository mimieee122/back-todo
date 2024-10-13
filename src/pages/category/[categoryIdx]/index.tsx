/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/router'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import Image from 'next/image'

// Prisma 클라이언트 생성

export default function CategoryDetail() {
    const router = useRouter()
    const { categoryIdx } = router.query
    const idx = Number(categoryIdx)

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await axios.get('/api/category') // 데이터 요청
            return response.data // 응답 데이터 반환
        },
    })

    const { data: priorities = [] } = useQuery({
        queryKey: ['priorities'],
        queryFn: async () => {
            const response = await axios.get('/api/priority') // 데이터 요청
            return response.data // 응답 데이터 반환
        },
    })

    // 사용자 정보 가져오기
    const me = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const response = await axios.get('/api/me') // 데이터 요청
            return response.data // 응답 데이터 반환
        },
    })

    // 해당 카테고리의 프로젝트를 가져오기
    const { data: projects, refetch } = useQuery({
        queryKey: ['projects', idx],
        queryFn: async () => {
            if (!idx) return [] // idx가 없을 경우 빈 배열 반환
            const response = await axios.get(`/api/category/${idx}`) // 데이터 요청
            return response.data // 응답 데이터 반환
        },
        enabled: !!idx, // idx가 있을 때만 쿼리를 실행
    })

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
            refetch() // 프로젝트 생성 후 다시 데이터 불러오기
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
    console.log('categoryIdx:', categoryIdx) // categoryIdx 확인
    console.log('categories:', categories) // categories 데이터 확인

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
                <h1>
                    Category{' '}
                    {categories.find((category) => category.idx === idx)?.title}{' '}
                    Projects
                </h1>
                {projects && projects.length > 0 ? (
                    <ul>
                        {projects.map((project) => {
                            const priority = priorities.find(
                                (p) => p.idx === project.priorityIdx
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
                    </ul>
                ) : (
                    <h2>No projects available for this category.</h2>
                )}
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
        </>
    )
}
