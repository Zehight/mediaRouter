import { afterEach, describe, expect, it, vi } from "vitest"
import type { ProviderPlugin } from "@miragari/ai-media-router-core"
import { ProviderRegistry } from "./registry.js"

const plugin = {
  id: "custom",
  displayName: "Custom",
  models: {},
  driver: {
    async create() {
      throw new Error("unused")
    },
  },
} satisfies ProviderPlugin
const fetchImpl = (() => Promise.reject(new Error("unused"))) as typeof fetch
const originalFetch = globalThis.fetch

afterEach(() => {
  vi.restoreAllMocks()
  globalThis.fetch = originalFetch
})

describe("ProviderRegistry", () => {
  it("accepts API key shorthand when provider name matches plugin id", () => {
    const registry = new ProviderRegistry({
      plugins: { custom: plugin },
      providers: {
        custom: "key",
      },
      fetch: fetchImpl,
    })

    const resolved = registry.get("custom")

    expect(resolved.config).toMatchObject({
      plugin: "custom",
      apiKey: "key",
    })
    expect(resolved.runtime.config.plugin).toBe("custom")
    expect(resolved.runtime.providerId).toBe("custom")
  })

  it("accepts undefined shorthand to enable authless or externally configured providers", () => {
    const registry = new ProviderRegistry({
      plugins: { custom: plugin },
      providers: {
        custom: undefined,
      },
      fetch: fetchImpl,
    })

    const resolved = registry.get("custom")

    expect(resolved.config).toEqual({ plugin: "custom" })
    expect(resolved.runtime.providerId).toBe("custom")
  })

  it("infers plugin id from provider name", () => {
    const registry = new ProviderRegistry({
      plugins: { custom: plugin },
      providers: {
        custom: {
          apiKey: "key",
        },
      },
      fetch: fetchImpl,
    })

    const resolved = registry.get("custom")

    expect(resolved.config).toMatchObject({
      plugin: "custom",
      apiKey: "key",
    })
    expect(resolved.runtime.config.plugin).toBe("custom")
    expect(resolved.runtime.providerId).toBe("custom")
  })

  it("keeps explicit plugin aliases", () => {
    const registry = new ProviderRegistry({
      plugins: { custom: plugin },
      providers: {
        customProxy: {
          plugin: "custom",
          apiKey: "key",
        },
      },
      fetch: fetchImpl,
    })

    const resolved = registry.get("customProxy")

    expect(resolved.config).toMatchObject({
      plugin: "custom",
      apiKey: "key",
    })
    expect(resolved.runtime.config.plugin).toBe("custom")
    expect(resolved.runtime.provider).toBe("customProxy")
  })

  it("binds the default global fetch before exposing it to provider runtimes", async () => {
    const boundFetch = vi.fn(async function (this: typeof globalThis) {
      if (this !== globalThis) {
        throw new TypeError("Illegal invocation")
      }
      return new Response(null, { status: 204 })
    }) as typeof fetch
    globalThis.fetch = boundFetch

    const registry = new ProviderRegistry({
      plugins: { custom: plugin },
      providers: {
        custom: "key",
      },
    })

    await expect(registry.get("custom").runtime.fetch("https://example.com")).resolves.toBeInstanceOf(
      Response,
    )
    expect(boundFetch).toHaveBeenCalledOnce()
  })
})
