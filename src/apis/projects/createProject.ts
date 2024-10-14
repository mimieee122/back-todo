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

        const categoryIndex = Number(categoryIdx)
        const name = String(title)
        const priorityIndex = Number(priorityIdx)

        if (!title || !priorityIdx || !categoryIdx) {
            return res
                .status(400)
                .json({ message: '프로젝트 명과 우선순위를 입력하세요.' })
        }

        const project = await prisma.project.create({
            data: {
                title: name,
                categoryIdx: categoryIndex,
                userIdx: Number(decoded.idx),
                priorityIdx: priorityIndex,
            },
        })
        return res.status(201).json(project)
    } catch (error) {
        console.error('프로젝트 생성 중 오류 발생:', error)
        return res
            .status(500)
            .json({ message: '프로젝트 생성에 실패했습니다.' })
    }
}
