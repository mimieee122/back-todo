import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'
import { verify } from 'jsonwebtoken'
import { getProjects } from '@/apis/projects/getProject'
import { createProject } from '@/apis/projects/createProject'

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse,
    categoryIdx: number
) => {
    const cookies = parseCookies({ req })
    const token = cookies['token']
    const secret = process.env.SECRET_JWT

    if (!secret) {
        throw new Error('SECRET_JWT 환경 변수가 설정되지 않았습니다.')
    }

    if (!token) {
        return res.status(400).json({ message: '토큰이 발급되지 않았습니다.' })
    }

    try {
        const decoded = verify(token, secret) as { idx: number }
        const userIdx = decoded.idx

        if (req.method === 'GET') {
            const projects = await getProjects(req, res, userIdx, categoryIdx)
            return res
                .status(200)
                .json({ message: '전체 프로젝트 조회 성공', projects })
        } else if (req.method === 'POST') {
            const project = await createProject(req, res, categoryIdx)
            return res
                .status(200)
                .json({ message: '프로젝트 생성 성공', project })
        } else {
            return res
                .status(405)
                .json({ message: '지원하지 않는 메서드입니다.' })
        }
    } catch (error) {
        console.error('토큰 검증 중 오류 발생:', error)
        return res.status(401).json({ message: '토큰이 올바르지 않습니다.' })
    }
}

export default handler
