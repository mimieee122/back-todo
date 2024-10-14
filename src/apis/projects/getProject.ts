import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export const getoneProject = async (
    req: NextApiRequest,
    res: NextApiResponse,
    projectIdx: number
) => {
    try {
        const project = await prisma.project.findUnique({
            where: {
                idx: projectIdx,
            },
        })
        res.status(200).json(project)
    } catch {
        res.status(500).json({ message: '서버 오류 발생' })
    }
}

export const getProjects = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const { categoryIdx } = req.query // 쿼리 파라미터에서 categoryIdx 추출
        const idx = Number(categoryIdx) // categoryIdx를 숫자로 변환
        const projects = await prisma.project.findMany({
            where: { categoryIdx: idx },
        })
        return res.status(200).json(projects)
    } catch (error) {
        console.error('프로젝트 전체 조회 중 오류 발생:', error)
        res.status(500).json({
            message: '서버 오류가 발생했습니다.',
        })
    }
}
