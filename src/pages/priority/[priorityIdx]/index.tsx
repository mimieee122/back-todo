/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/router'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

// Prisma 클라이언트 생성

export default function CategoryDetail() {
    const [priorities, setPriorities] = useState([]) // 우선 순위 상태 추가

    const router = useRouter()

    const idx = Number(router.query.priorityIdx)

    const me = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const response = await axios.get('/api/me')
            return response.data
        },
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

    const { data: projects } = useQuery({
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

    const priority = priorities.find((priority) => priority.idx === idx)

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
                        <button className=" text-[#fff983]">CATEGORY</button>
                    </Link>
                    <Link href="/">
                        <button>HOME</button>
                    </Link>
                </div>
            </nav>

            <div>
                {/*category 변수는 비동기적으로 업데이트되므로 물음표 붙이기..*/}
                <h1>PRIORITY {priority?.title || 'Unknown'} Projects</h1>
                <ul className="project-list">
                    {projects?.map((project) => {
                        // 프로젝트의 우선순위의 label 찾기

                        return (
                            <li key={project.idx} className="task">
                                <div>{project.title}</div>
                                <div>{priority.title}</div>{' '}
                                {/* 여기서 label을 사용 */}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}
