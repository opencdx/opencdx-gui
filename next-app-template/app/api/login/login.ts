import { NextApiRequest, NextApiResponse } from 'next'
import { signIn } from '@/auth'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userName, password } = req.body
        await signIn('credentials', { userName, password })

        res.status(200).json({ success: true })
    } catch (error) {
            res.status(500).json({ error: 'Something went wrong.' })

    }
}