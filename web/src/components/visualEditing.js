// import { STUDIO_ORIGIN, useLiveMode } from "../../sanity/store";
// import { enableOverlays } from "@sanity/overlays";
// import { useEffect } from "react";

// export function VisualEditing() {
//   debugger
//   useEffect(() => enableOverlays(), []);
//   enableOverlays()
//   useLiveMode({ allowStudioOrigin: STUDIO_ORIGIN });

//   return null;
// }

// // components/VisualEditing.tsx

// "use client";

import { STUDIO_ORIGIN, useLiveMode } from "../../sanity/store";
import { enableOverlays } from "@sanity/overlays";
import { useParams } from "@reach/router"
import { useEffect, useMemo, useRef } from "react";

export function VisualEditing({location}) {

  const searchParams = location.search;

  const routerRef = useRef(location);
  const navigateRef = useRef();

  routerRef.current = location.current;

  const history = useMemo(
    () => ({
      subscribe(navigate) {
        navigateRef.current = navigate;
        return () => {
          navigateRef.current = undefined;
        };
      },
      update(update) {
        switch (update.type) {
          case "push":
            return routerRef.current.push(update.url);
          case "pop":
            return routerRef.current.back();
          case "replace":
            return routerRef.current.replace(update.url);
          default:
            throw new Error(`Unknown update type: ${update.type}`);
        }
      },
    }),
    []
  );

  useEffect(
    () =>
      enableOverlays({
        allowStudioOrigin: STUDIO_ORIGIN,
        history,
      }),
    [history]
  );

  useEffect(() => {
    navigateRef.current?.({
      type: "push",
      url: `${location.pathname}${searchParams?.size ? `?${searchParams}` : ""}`,
    });
  }, [location.pathname, searchParams]);

  useLiveMode({ allowStudioOrigin: STUDIO_ORIGIN });

  return null;
}