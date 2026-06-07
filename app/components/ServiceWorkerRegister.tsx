"use client";

import { useEffect, useRef } from "react";

const SW_URL = "/sw.js";
const UPDATE_INTERVAL_MS = 60_000;

function activateWaitingWorker(registration: ServiceWorkerRegistration) {
  const waiting = registration.waiting;
  if (!waiting) return;
  waiting.postMessage({ type: "SKIP_WAITING" });
}

async function checkForUpdates(registration: ServiceWorkerRegistration) {
  try {
    await registration.update();
    activateWaitingWorker(registration);
  } catch {
    // Update checks are best-effort.
  }
}

export default function ServiceWorkerRegister() {
  const reloadedRef = useRef(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let registration: ServiceWorkerRegistration | null = null;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const onControllerChange = () => {
      if (reloadedRef.current) return;
      reloadedRef.current = true;
      window.location.reload();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible" && registration) {
        void checkForUpdates(registration);
      }
    };

    const register = async () => {
      try {
        registration = await navigator.serviceWorker.register(SW_URL, {
          scope: "/",
          updateViaCache: "none",
        });

        if (registration.waiting && navigator.serviceWorker.controller) {
          activateWaitingWorker(registration);
        }

        registration.addEventListener("updatefound", () => {
          const installing = registration?.installing;
          if (!installing) return;

          installing.addEventListener("statechange", () => {
            if (
              installing.state === "installed" &&
              navigator.serviceWorker.controller &&
              registration
            ) {
              activateWaitingWorker(registration);
            }
          });
        });

        await checkForUpdates(registration);

        intervalId = setInterval(() => {
          if (registration) void checkForUpdates(registration);
        }, UPDATE_INTERVAL_MS);
      } catch {
        // Service worker registration is best-effort for PWA support.
      }
    };

    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    void register();

    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return null;
}

export async function refreshPwa() {
  if (!("serviceWorker" in navigator)) {
    window.location.reload();
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.update();
    activateWaitingWorker(registration);
  } catch {
    // Fall through to hard reload.
  }

  window.location.reload();
}
