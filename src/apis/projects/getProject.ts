import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export const getProject = async (
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
