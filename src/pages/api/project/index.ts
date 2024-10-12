import { createProject } from '@/apis/projects/createProject'
import { getProjects } from '@/apis/projects/getProject'
import { verify } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const secret = process.env.SECRET_JWT

        if (!secret) {
            console.error('JWT_SECRET is not defined.')
            return res.status(500).json({
                message: 'JWT_SECRET 환경 변수가 설정되지 않았습니다.',
            })
        }

        const cookies = parseCookies({ req })

        const token = cookies['token']
        if (!token) {
            return res
                .status(400)
                .json({ message: '토큰이 발급되지 않았습니다.' })
        }

        const payload = verify(token, secret) as { idx: number } // 올바른 타입으로 변환

        const { categoryIdx, priorityIdx, title } = req.body

        const userIdx = payload.idx

        if (req.method === 'GET') {
            const project = await getProjects(req, res, userIdx, categoryIdx)
            return res.status(200).json(project)
        } else if (req.method === 'POST') {
            const projects = await createProject(
                req,
                res,
                Number(categoryIdx),
                Number(priorityIdx),
                String(title)
            )
            return res.status(201).json(projects) // 201 Created
            // } else if (req.method === 'PUT') {
            //     const project = await updateProject(req, res, projectIdx)
            //     return res.status(200).json(project)
            // } else if (req.method === 'DELETE') {
            //     const project = await deleteProject(req, res, projectIdx)
            //     return res.status(200).json(project)
            // }
        }
    } catch (error) {
        console.error('토큰 검증 중 오류 발생:', error)
        return res.status(401).json({ message: '토큰이 올바르지 않습니다.' })
    }
}

export default handler
