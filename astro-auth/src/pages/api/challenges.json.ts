import type { APIRoute } from "astro";
import { addUserChallenge, getUserChallenges } from "../../lib/db";

export const GET: APIRoute = async ({ locals }) => {
  const user = await locals.currentUser()
  if (!user) {
    return new Response(
      JSON.stringify({ 
        ok: false,
        error: "User not authenticated" 
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  const challenges = await getUserChallenges(user.id)
  
  return new Response(
    JSON.stringify({challenges}),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
}

export const POST: APIRoute = async ({ locals, request }) => {
  const user = await locals.currentUser()
  if (!user) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "User not authenticated"
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }
  
  const data = await request.json()
  const { challenge } = data

  if (typeof challenge !== 'string' || challenge.trim().length === 0) {
    return new Response(
      JSON.stringify({ 
        ok: false,
        error: "Invalid challenge" 
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  await addUserChallenge(user.id, challenge.trim())
  return new Response(
    JSON.stringify({ 
      ok: true,
      message: "Challenge added successfully" 
    }),
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
}