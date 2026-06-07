"use client";

import { useEffect, useRef, useState } from "react";
import { refreshPwa } from "@/app/components/ServiceWorkerRegister";

const PULL_THRESHOLD = 72;
const MAX_PULL = 96;
const HERO_TOP_TOLERANCE = 8;

export default function PullToRefresh() {
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const pulling = useRef(false);
  const pullDistance = useRef(0);
  const heroVisible = useRef(false);
  const refreshingRef = useRef(false);

  useEffect(() => {
    refreshingRef.current = refreshing;
  }, [refreshing]);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        heroVisible.current =
          entry.isIntersecting &&
          entry.boundingClientRect.top >= -HERO_TOP_TOLERANCE;
      },
      { threshold: [0, 0.15, 0.35, 0.5] }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canPull = () =>
      window.scrollY <= HERO_TOP_TOLERANCE &&
      heroVisible.current &&
      !refreshingRef.current &&
      !document.body.classList.contains("menu-open");

    const onTouchStart = (event: TouchEvent) => {
      if (!canPull()) return;
      startY.current = event.touches[0].clientY;
      pulling.current = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (startY.current === 0 || !canPull()) return;

      const delta = event.touches[0].clientY - startY.current;
      if (delta <= 0) {
        pullDistance.current = 0;
        setPull(0);
        return;
      }

      pulling.current = true;
      const nextPull = Math.min(delta * 0.45, MAX_PULL);
      pullDistance.current = nextPull;
      setPull(nextPull);

      if (delta > 12) {
        event.preventDefault();
      }
    };

    const onTouchEnd = async () => {
      if (!pulling.current) {
        startY.current = 0;
        return;
      }

      const shouldRefresh = pullDistance.current >= PULL_THRESHOLD;
      pulling.current = false;
      startY.current = 0;

      if (shouldRefresh) {
        setRefreshing(true);
        setPull(PULL_THRESHOLD);
        await refreshPwa();
        return;
      }

      pullDistance.current = 0;
      setPull(0);
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  const progress = Math.min(pull / PULL_THRESHOLD, 1);
  const active = pull > 0 || refreshing;

  return (
    <div
      className={`pull-refresh${active ? " pull-refresh--active" : ""}${refreshing ? " pull-refresh--refreshing" : ""}`}
      style={{ "--pull-progress": progress, "--pull-distance": `${pull}px` } as React.CSSProperties}
      aria-hidden={!active}
    >
      <div className="pull-refresh__indicator">
        <svg
          className="pull-refresh__icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M12 5v14M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="pull-refresh__label">
          {refreshing ? "Refreshing…" : progress >= 1 ? "Release to refresh" : "Pull to refresh"}
        </span>
      </div>
    </div>
  );
}
