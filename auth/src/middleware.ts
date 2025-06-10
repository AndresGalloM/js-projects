import { NextRequest, NextResponse } from "next/server";
import { getUserSessionId, updateUserSession } from "./auth/session";

const PRIVATE_ROUTES = ["/private"];
const ADMIN_ROUTES = ["/admin"];

export async function middleware(request: NextRequest) {
  const response = (await middlewareAuth(request)) ?? NextResponse.next();

  const user = await getUserSessionId({
    get: (key) => {
      return request.cookies.get(key);
    },
  });

  if (!user) return response;

  await updateUserSession(user, {
    get: (key) => {
      return request.cookies.get(key);
    },
    set: (key, value, options) => {
      response.cookies.set({ ...options, name: key, value });
    },
  });

  return response;
}

export async function middlewareAuth(request: NextRequest) {
  if (PRIVATE_ROUTES.includes(request.nextUrl.pathname)) {
    const user = await getUserSessionId(request.cookies);

    if (!user) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (ADMIN_ROUTES.includes(request.nextUrl.pathname)) {
    const user = await getUserSessionId(request.cookies);

    if (!user) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (user.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-know).*)",
  ],
};
