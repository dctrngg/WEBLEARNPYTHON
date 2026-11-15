/**
 * Pyodide WebAssembly Preloader & Cache Manager
 * Pre-fetches CPython 3.12 WASM binary and stdlib into CacheStorage upon page visit / login.
 * Ensures that by the time student enters the Workspace, Python starts up instantaneously.
 */

export type PyodidePreloadState = "idle" | "loading" | "ready" | "error";

export interface PyodidePreloadStatus {
  state: PyodidePreloadState;
  progress: number; // 0 - 100
  message: string;
}

const CACHE_NAME = "pyodide-v0.26.4-wasm-cache";
const PYODIDE_BASE = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";

const ASSETS_TO_PRELOAD = [
  { url: `${PYODIDE_BASE}pyodide.js`, weight: 20 },
  { url: `${PYODIDE_BASE}pyodide.asm.js`, weight: 20 },
  { url: `${PYODIDE_BASE}pyodide.asm.wasm`, weight: 40 },
  { url: `${PYODIDE_BASE}python_stdlib.zip`, weight: 20 },
];

let globalStatus: PyodidePreloadStatus = {
  state: "idle",
  progress: 0,
  message: "Chưa nạp runtime",
};

const listeners = new Set<(status: PyodidePreloadStatus) => void>();

function notify() {
  listeners.forEach((listener) => listener({ ...globalStatus }));
}

export function subscribePyodidePreload(
  listener: (status: PyodidePreloadStatus) => void
): () => void {
  listeners.add(listener);
  listener({ ...globalStatus });
  return () => {
    listeners.delete(listener);
  };
}

export async function preloadPyodide(): Promise<void> {
  if (globalStatus.state === "loading" || globalStatus.state === "ready") {
    return;
  }

  globalStatus = {
    state: "loading",
    progress: 5,
    message: "Khởi tạo tiến trình tải trước CPython 3.12...",
  };
  notify();

  try {
    let cache: Cache | null = null;
    if ("caches" in window) {
      try {
        cache = await caches.open(CACHE_NAME);
      } catch (err) {
        console.warn("[PyodidePreload] CacheStorage not accessible, falling back to HTTP cache", err);
      }
    }

    let accumulatedWeight = 5;

    for (const asset of ASSETS_TO_PRELOAD) {
      // Check if already in cache
      if (cache) {
        const cachedResponse = await cache.match(asset.url);
        if (cachedResponse) {
          accumulatedWeight += asset.weight;
          globalStatus = {
            state: "loading",
            progress: Math.min(100, Math.round(accumulatedWeight)),
            message: `Đã nạp từ Cache: ${asset.url.split("/").pop()}`,
          };
          notify();
          continue;
        }
      }

      // Fetch with Cache-Control: max-age=31536000, immutable
      const response = await fetch(asset.url, {
        mode: "cors",
        cache: "force-cache",
      });

      if (response.ok && cache) {
        try {
          // Clone and store in cache with long-lived headers
          const headers = new Headers(response.headers);
          headers.set("Cache-Control", "public, max-age=31536000, immutable");
          const blob = await response.clone().blob();
          const customResponse = new Response(blob, {
            status: response.status,
            statusText: response.statusText,
            headers,
          });
          await cache.put(asset.url, customResponse);
        } catch {
          // Ignore cache put failures in non-secure or restricted frames
        }
      }

      accumulatedWeight += asset.weight;
      globalStatus = {
        state: "loading",
        progress: Math.min(100, Math.round(accumulatedWeight)),
        message: `Đã tải: ${asset.url.split("/").pop()}`,
      };
      notify();
    }

    globalStatus = {
      state: "ready",
      progress: 100,
      message: "CPython 3.12 WASM Kernel đã nạp sẵn & sẵn sàng!",
    };
    notify();
  } catch (err) {
    console.error("[PyodidePreload] Preload error:", err);
    globalStatus = {
      state: "error",
      progress: 0,
      message: `Lỗi nạp trước: ${err instanceof Error ? err.message : String(err)}`,
    };
    notify();
  }
}
