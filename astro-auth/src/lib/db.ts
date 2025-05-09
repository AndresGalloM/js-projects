import { promises as fs} from 'node:fs'
import path from 'node:path'

const DATA_DIR = path.resolve('/tmp/data/challenges')

const getUserFile = async (userId: string) => {
  await fs.mkdir(DATA_DIR, { recursive: true})
  return path.join(DATA_DIR, `${userId}.json`)
}

export const getUserChallenges = async (userId: string) => {
  const filePath = await getUserFile(userId)

  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading file for user ${userId}:`, error)
    return []
  }
}

export const addUserChallenge = async (userId: string, challenge: string) => {
  const filePath = await getUserFile(userId)

  const challenges = await getUserChallenges(userId)
  challenges.push(challenge)

  try {
  await fs.writeFile(filePath, JSON.stringify(challenges), 'utf-8')
  } catch (error) {
  console.error(`Error writing file for user ${userId}:`, error)
  }
}