import { useCallback } from "react";
import { useLocation, useNavigate, useRouter } from "@tanstack/react-router";

type ModalTo = { to: "/blog/$slug" | "/services/$slug" | "/work/$slug"; params: { slug: string } };

// Modals are driven by the URL: opening pushes the item's URL, closing goes back
// when the visitor opened it in-page, otherwise replaces with the homepage.
export function useModalRoute() {
  const navigate = useNavigate();
  const router = useRouter();
  const pathname = useLocation({ select: (l) => l.pathname });
  const open = useCallback((t: ModalTo) => {
    const inModal = /^\/(blog|services|work)\//.test(window.location.pathname);
    void navigate({ ...t, resetScroll: false, replace: inModal, state: { auraliqueInPage: true } as never });
  }, [navigate]);
  const close = useCallback(() => {
    const state = router.history.location.state as { auraliqueInPage?: boolean };
    if (state.auraliqueInPage && window.history.length > 1) router.history.back();
    else void navigate({ to: "/", resetScroll: false, replace: true });
  }, [navigate, router]);
  const goHome = useCallback((hash: string) => { void navigate({ to: "/", hash, replace: true }); }, [navigate]);
  return { pathname, open, close, goHome };
}

export const slugFor = (pathname: string, prefix: "blog" | "services" | "work") => {
  const m = pathname.match(new RegExp(`^/${prefix}/([^/]+)/?$`));
  return m ? decodeURIComponent(m[1]!) : null;
};
