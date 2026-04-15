import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuthed = Boolean(req.auth);

  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password");

  const isPublicApi =
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/webhooks") ||
    pathname.startsWith("/api/uploads") ||
    pathname.startsWith("/api/cron");
  const isPublicAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname === "/robots.txt";

  const isPublicMarketing =
    pathname.startsWith("/legal") || pathname.startsWith("/family");

  if (isPublicApi || isPublicAsset || isPublicMarketing) {
    return;
  }

  if (!isAuthed && !isAuthRoute) {
    const url = new URL("/login", req.url);
    return Response.redirect(url);
  }

  if (isAuthed && isAuthRoute) {
    return Response.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
