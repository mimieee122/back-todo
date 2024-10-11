import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function CategoryDetail() {
    const router = useRouter()
    const categoryIdx = router.query
    const idx = Number(categoryIdx)

    const { data: project } = useQuery({
        queryKey: ['category', idx],
        queryFn: async () => {
            const response = await axios.get(`/api/categories/${idx}`)
            return response.data
        },
    })

    if (!project) {
        return <div className="text-white">프로젝트가 존재하지 않습니다.</div>
    }

    return (
        <div>
            <p>카테고리 {categoryIdx.name}의 프로젝트 목록</p>
            <ul>
                {project.map((project) => (
                    <li key={project.projectIdx}>{project.name}</li>
                ))}
            </ul>
        </div>
    )
}
