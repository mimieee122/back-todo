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
    res: NextApiResponse,
    userIdx: number,
    categoryIdx: number
) => {
    try {
        const projects = await prisma.project.findMany({
            where: {
                userIdx: userIdx,
                categoryIdx: categoryIdx,
            },
        })
        res.status(200).json(projects)
    } catch (error) {
        console.error('카테고리 전체 조회 중 오류 발생:', error)
        res.status(500).json({
            message: '서버 오류가 발생했습니다.',
        })
    }
}
