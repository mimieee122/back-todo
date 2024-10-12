import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken'
import { parseCookies } from 'nookies'

const prisma = new PrismaClient()

export const createProject = async (
    req: NextApiRequest,
    res: NextApiResponse,
    categoryIdx: number,
    priorityIdx: number,
    title: string
) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: '허용되지 않은 메소드 입니다.' })
    }

    try {
        const cookies = parseCookies({ req })
        const token = cookies['token']

        if (!token) {
            return res
                .status(401)
                .json({ message: '로그인 후 프로젝트 생성이 가능합니다.' })
        }

        let decoded
        try {
            decoded = verify(token, process.env.SECRET_JWT as string) as {
                idx: number
                nickname: string
            }
        } catch {
            return res
                .status(401)
                .json({ message: '유효하지 않은 토큰입니다.' })
        }

        if (!title || !priorityIdx) {
            return res
                .status(400)
                .json({ message: '프로젝트 명과 우선순위를 입력하세요.' })
        }

        const projects = await prisma.project.create({
            data: {
                title: String(title),
                categoryIdx: Number(categoryIdx),
                userIdx: decoded.idx,
                priorityIdx: Number(priorityIdx),
            },
        })
        return res.status(201).json(projects)
    } catch (error) {
        console.error('프로젝트 생성 중 오류 발생', error)
        return res.status(500).json({ message: '서버 오류 발생' })
    } finally {
        await prisma.$disconnect()
    }
}
