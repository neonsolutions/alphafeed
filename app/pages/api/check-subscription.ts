import { NextApiHandler } from "next"
import { getServerSession } from "next-auth"
import { prisma } from "../../lib/prisma"
import { authOptions } from "./auth/[...nextauth]"

const ToggleEmailSubscription: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.email) {
    return res.status(403).json({ error: { statusCode: 403, message: "Not authorized" } })
  }

  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    try {
      return res.status(200).json({ user })
    } catch (err: any) {
      console.log(err)
      res.status(500).json({ error: { statusCode: 500, message: err.message } })
    }
  } else {
    res.setHeader("Allow", "GET")
    res.status(405).end("Method Not Allowed")
  }
}

export default ToggleEmailSubscription
