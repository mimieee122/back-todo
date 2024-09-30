import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken'

import { parseCookies } from 'nookies'

const prisma = new PrismaClient()

export const createProject = async (
    req: NextApiRequest,
    res: NextApiResponse,
    categoryIdx: number,
    title: string,
    priorityIdx: number
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
            nickname: string
        }

        //const {title}=req.body
        // if(!title)
        // {
        //     return res.status(400).json({message:'프로젝트 명을 입력하세요.'})
        // }

        const idx = req.query

        const user = await prisma.user.findUnique({
            where: {
                idx: decoded.idx,
            },
            select: {
                nickname: true,
            },
        })
        if (!user) {
            return res.status(401).json({ message: '유저가 없습니다.' })
        }

        const project = await prisma.project.create({
            data: {
                idx: Number(idx),
                title: title,
                categoryIdx: categoryIdx,
                userIdx: Number(decoded.idx),
                priorityIdx: priorityIdx,
            },
        })
        return res.status(201).json(project)
    } catch (error) {
        console.error('프로젝트 생성 중 오류 발생', error)
        return res.status(500).json({ message: '서버 오류 발생' })
    }
}
