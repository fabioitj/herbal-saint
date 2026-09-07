"use client";

import { useEffect, useState, type RefObject } from "react";

const clamp = (value: number, max = 1) => Math.max(0, Math.min(max, value));
const ease = (value: number) => value * value * (3 - 2 * value);
const motionProperties = ["--scene-x", "--scene-scale", "--scene-opacity", "--progress", "--enter"];

export function useBotanicalJourney(root: RefObject<HTMLElement | null>) {
  const [activeSection, setActiveSection] = useState("origin");

  useEffect(() => {
    const element = root.current;
    const journey = element?.querySelector<HTMLElement>(".journey");
    const stage = journey?.querySelector<HTMLElement>(".journey-stage");
    if (!element || !journey || !stage) return;
    const scenes = Array.from(stage.querySelectorAll<HTMLElement>("[data-motion]"));
    if (!scenes.length) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const originalImmersive = element.dataset.immersive;
    const originalHeight = journey.style.height;
    const originalRestoration = window.history.scrollRestoration;
    const originals = scenes.map(scene => ({
      visibility: scene.style.visibility,
      inert: scene.inert,
      hidden: scene.getAttribute("aria-hidden"),
      tabIndex: scene.getAttribute("tabindex"),
      properties: motionProperties.map(property => scene.style.getPropertyValue(property)),
    }));
    let immersive = !media.matches;
    let viewport = window.innerHeight;
    let viewportWidth = window.innerWidth;
    let step = viewport * 1.2;
    let start = 0;
    let position = 0;
    let dominant = 0;
    let frame = 0;
    let focusTimer = 0;
    let pendingFocus: { index: number; top: number } | null = null;
    let disposed = false;

    const restoreScene = (scene: HTMLElement, index: number) => {
      const original = originals[index];
      scene.style.visibility = original.visibility;
      scene.inert = original.inert;
      if (original.hidden === null) scene.removeAttribute("aria-hidden");
      else scene.setAttribute("aria-hidden", original.hidden);
      if (original.tabIndex === null) scene.removeAttribute("tabindex");
      else scene.setAttribute("tabindex", original.tabIndex);
      motionProperties.forEach((property, propertyIndex) => {
        const value = original.properties[propertyIndex];
        if (value) scene.style.setProperty(property, value);
        else scene.style.removeProperty(property);
      });
    };

    const finishFocus = () => {
      if (!pendingFocus) return;
      const { index, top } = pendingFocus;
      if (Math.abs(window.scrollY - top) <= 3 && (!immersive || dominant === index)) {
        scenes[index].focus({ preventScroll: true });
        pendingFocus = null;
        window.clearTimeout(focusTimer);
      }
    };

    const update = () => {
      frame = 0;
      if (disposed) return;
      const scroll = window.scrollY;
      // Collect layout reads before updating scene styles.
      const bounds = !immersive ? scenes.map(scene => scene.getBoundingClientRect()) : [];
      if (!immersive) {
        dominant = 0;
        bounds.forEach((rect, index) => { if (rect.top <= viewport * .45) dominant = index; });
        const total = Math.max(1, document.documentElement.scrollHeight - viewport);
        element.style.setProperty("--page-progress", String(clamp(scroll / total)));
        setActiveSection(scenes[dominant].dataset.chapter ?? scenes[dominant].id);
        return;
      }

      position = clamp((scroll - start) / step, scenes.length - 1);
      const index = Math.min(Math.floor(position), scenes.length - 1);
      const fraction = position - index;
      const transition = ease(clamp((fraction - .25) / .75));
      const next = Math.min(index + 1, scenes.length - 1);
      dominant = transition >= .5 ? next : index;
      const gardenTransition = scenes[next].id === "jardim" && index !== next;
      const formulaTransition = index !== next && scenes[index].classList.contains("formula-scene") && scenes[next].classList.contains("formula-scene");
      element.style.setProperty("--page-progress", String(position / Math.max(1, scenes.length - 1)));
      element.style.setProperty("--bottle-turn", `${Math.sin(position * .8) * 6}deg`);

      scenes.forEach((scene, sceneIndex) => {
        const current = sceneIndex === index;
        const incoming = sceneIndex === next && next !== index;
        const visible = current || incoming;
        let x = sceneIndex < index ? -100 : 100;
        let scale = 1;
        let opacity = 0;
        if (current) {
          x = gardenTransition || formulaTransition ? 0 : -100 * transition;
          scale = formulaTransition ? 1 : gardenTransition ? 1 - .07 * transition : 1 - .035 * transition;
          opacity = gardenTransition || formulaTransition ? 1 - transition : 1;
        } else if (incoming) {
          x = gardenTransition || formulaTransition ? 0 : 100 * (1 - transition);
          scale = formulaTransition ? 1 : gardenTransition ? 1.16 - .16 * transition : .965 + .035 * transition;
          opacity = gardenTransition || formulaTransition ? transition : 1;
        }
        scene.style.visibility = visible ? "visible" : "hidden";
        scene.style.setProperty("--scene-x", `${x}%`);
        scene.style.setProperty("--scene-scale", String(scale));
        scene.style.setProperty("--scene-opacity", String(opacity));
        scene.style.setProperty("--progress", String(current || (incoming && formulaTransition) ? fraction : 0));
        scene.style.setProperty("--enter", String(current ? 1 : incoming ? transition : 0));
        if (sceneIndex !== dominant && document.activeElement instanceof HTMLElement && scene.contains(document.activeElement)) {
          document.activeElement.blur();
        }
        scene.inert = sceneIndex !== dominant;
        scene.setAttribute("aria-hidden", String(sceneIndex !== dominant));
        scene.setAttribute("tabindex", "-1");
      });
      setActiveSection(scenes[dominant].dataset.chapter ?? scenes[dominant].id);
      finishFocus();
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
      if (pendingFocus) {
        window.clearTimeout(focusTimer);
        focusTimer = window.setTimeout(() => {
          finishFocus();
          // A wheel or touch interruption should not move focus to a hidden scene.
          pendingFocus = null;
        }, 180);
      }
    };

    const indexForHash = (hash: string) => {
      let id: string;
      try { id = decodeURIComponent(hash.replace(/^#/, "")); }
      catch { return -1; }
      if (!id) return 0;
      const target = document.getElementById(id);
      return target ? scenes.findIndex(scene => scene === target || scene.contains(target)) : -1;
    };

    const navigate = (index: number, smooth: boolean, focus = true) => {
      if (index < 0 || index >= scenes.length) return;
      const top = immersive
        ? start + index * step
        : scenes[index].getBoundingClientRect().top + window.scrollY;
      if (focus) {
        scenes[index].setAttribute("tabindex", "-1");
        pendingFocus = { index, top };
      }
      window.scrollTo({ top, behavior: smooth && immersive ? "smooth" : "instant" });
      schedule();
    };

    const configure = (initial = false) => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      const wasImmersive = immersive;
      const preserve = initial ? 0 : wasImmersive ? position : dominant;
      immersive = !media.matches;
      pendingFocus = null;
      window.clearTimeout(focusTimer);
      element.dataset.immersive = String(immersive);
      // The stage uses 100svh, so mobile browser chrome does not change chapter distances.
      viewport = immersive ? stage.clientHeight || window.innerHeight : window.innerHeight;
      viewportWidth = window.innerWidth;
      step = Math.max(1, viewport * 1.2);
      window.history.scrollRestoration = immersive ? "manual" : originalRestoration;
      journey.style.height = immersive ? `${(scenes.length - 1) * step + window.innerHeight}px` : originalHeight;
      if (!immersive) {
        scenes.forEach(restoreScene);
        element.style.removeProperty("--bottle-turn");
      }
      start = journey.getBoundingClientRect().top + window.scrollY;

      const hashIndex = initial && window.location.hash ? indexForHash(window.location.hash) : -1;
      if (hashIndex >= 0) navigate(hashIndex, false, immersive);
      else if (!initial) {
        if (immersive) window.scrollTo({ top: start + preserve * step, behavior: "instant" });
        else scenes[dominant].scrollIntoView({ behavior: "instant", block: "start" });
      }
      window.cancelAnimationFrame(frame);
      update();
    };

    const onClick = (event: MouseEvent) => {
      if (!immersive || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || !element.contains(anchor) || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#")) return;
      const index = indexForHash(href);
      if (index < 0) return;
      event.preventDefault();
      if (window.location.hash !== href) window.history.pushState(window.history.state, "", href);
      navigate(index, true);
    };
    const onHistory = () => {
      if (immersive) navigate(indexForHash(window.location.hash), false);
    };
    const onResize = () => {
      if (!immersive) {
        viewport = window.innerHeight;
        schedule();
        return;
      }
      if (stage.clientHeight === viewport && window.innerWidth === viewportWidth) {
        // Only adjust the end runway when browser toolbars move; never scrollTo here.
        journey.style.height = `${(scenes.length - 1) * step + window.innerHeight}px`;
        schedule();
        return;
      }
      configure();
    };
    const onMedia = () => configure();
    const onScrollEnd = () => finishFocus();

    configure(true);
    element.addEventListener("click", onClick);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", onResize);
    window.addEventListener("hashchange", onHistory);
    window.addEventListener("popstate", onHistory);
    media.addEventListener("change", onMedia);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      window.clearTimeout(focusTimer);
      element.removeEventListener("click", onClick);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", onHistory);
      window.removeEventListener("popstate", onHistory);
      media.removeEventListener("change", onMedia);
      journey.style.height = originalHeight;
      window.history.scrollRestoration = originalRestoration;
      if (originalImmersive === undefined) delete element.dataset.immersive;
      else element.dataset.immersive = originalImmersive;
      element.style.removeProperty("--page-progress");
      element.style.removeProperty("--bottle-turn");
      scenes.forEach(restoreScene);
    };
  }, [root]);

  return activeSection;
}
