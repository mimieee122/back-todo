import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken'

import { parseCookies } from 'nookies'

const prisma = new PrismaClient()

export const createProject = async (
    req: NextApiRequest,
    res: NextApiResponse,
    categoryIdx: number
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
            id: string
        }

        const { title, priorityIdx } = req.body

        if (!title || !priorityIdx) {
            return res
                .status(400)
                .json({ message: '프로젝트 명과 우선순위를 입력하세요.' })
        }

        const user = await prisma.user.findUnique({
            where: {
                idx: decoded.idx,
            },
            select: {
                id: true,
            },
        })
        if (!user) {
            return res.status(401).json({ message: '유저가 없습니다.' })
        }

        // user.title , user.priorityIdx 뭐 이러고 있었음 ..

        const project = await prisma.project.create({
            data: {
                title: title,
                categoryIdx: categoryIdx,
                userIdx: Number(decoded.idx),
                priorityIdx: Number(priorityIdx),
            },
        })
        return res.status(201).json(project)
    } catch (error) {
        console.error('프로젝트 생성 중 오류 발생', error)
        return res.status(500).json({ message: '서버 오류 발생' })
    }
}
