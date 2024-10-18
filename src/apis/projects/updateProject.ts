import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'
import { verify } from 'jsonwebtoken'

const prisma = new PrismaClient()

export const updateProject = async (
    req: NextApiRequest,
    res: NextApiResponse,
    projectIdx: number
) => {
    const cookies = parseCookies({ req })
    const token = cookies['token']

    if (!token) {
        return res.status(401).json({ message: '토큰이 없습니다.' })
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET as string) as {
            idx: number
        }

        const { title, priorityIdx } = req.body

        if (!title || !priorityIdx) {
            return res
                .status(400)
                .json({ message: '프로젝트 명과 우선순위를 입력하세요.' })
        }

        const project = await prisma.project.findUnique({
            where: { idx: projectIdx },
            select: { userIdx: true },
        })

        if (!project) {
            return res
                .status(404)
                .json({ message: '게시물을 찾을 수 없습니다.' })
        }

        if (decoded.idx !== project.userIdx) {
            return res
                .status(400)
                .json({ message: '프로젝트를 수정할 권한이 없습니다.' })
        }

        const result = await prisma.project.update({
            where: { idx: projectIdx },
            data: { title: title, priorityIdx: priorityIdx },
        })
        res.status(200).json(result)
    } catch (error) {
        console.error('프로젝트 수정 중 오류 발생', error)
        return res
            .status(500)
            .json({ message: '프로젝트 업데이트에 실패했습니다.' })
    }
}
