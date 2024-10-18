/* eslint-disable @typescript-eslint/no-explicit-any */
// 해야 함

import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function ProjectDetail() {
    const router = useRouter()
    const projectIdx = router.query
    const idx = Number(projectIdx)

    const { data: project, refetch } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const response = await axios.get(`/api/project/${idx}`)
            return response.data
        },
        enabled: !!idx,
    })

    const updateProjectMutation = useMutation({
        mutationFn: async (data: { title: string }) => {
            await axios.put(`/api/project/${idx}`)
        },
        onSuccess: () => {
            refetch()
        },
    })

    const handleUpdateProject = (e: any) => {
        e.preventDefault()
        if (!title) {
            alert('제목, 내용을 모두 입력해주세요.')
            return
        }
        updateProjectMutation.mutate({ title })
    }
}
