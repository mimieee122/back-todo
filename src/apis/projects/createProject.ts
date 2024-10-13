import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken'
import { parseCookies } from 'nookies'

const prisma = new PrismaClient()

export const createProject = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: '허용되지 않은 메소드 입니다.' })
    }

    const cookies = parseCookies({ req })
    const token = cookies['token']

    if (!token) {
        return res
            .status(401)
            .json({ message: '로그인 후 프로젝트 생성이 가능합니다.' })
    }
    try {
        const decoded = verify(token, process.env.SECRET_JWT as string) as {
            idx: number
        }
        const { categoryIdx, title, priorityIdx } = req.body

        const category = await prisma.category.findUnique({
            where: { idx: categoryIdx },
        })
        const priority = await prisma.priority.findUnique({
            where: { idx: priorityIdx },
        })

        if (!category || !priority) {
            return res
                .status(400)
                .json({ message: '잘못된 카테고리 또는 우선순위입니다.' })
        }

        if (!title || !priorityIdx || !title) {
            return res
                .status(400)
                .json({ message: '프로젝트 명과 우선순위를 입력하세요.' })
        }

        const projects = await prisma.project.create({
            data: {
                title,
                categoryIdx,
                userIdx: Number(decoded.idx),
                priorityIdx,
            },
        })
        return res.status(201).json(projects)
    } catch (error) {
        console.error('프로젝트 생성 중 오류 발생:', error)
        return res
            .status(500)
            .json({ message: '프로젝트 생성에 실패했습니다.' })
    }
}
