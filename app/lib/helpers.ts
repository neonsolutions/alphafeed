import { JSDOM } from "jsdom"

export function extractImageSources(text: string): string[] {
  try {
    const dom = new JSDOM(text)
    const imgElements = dom.window.document.getElementsByTagName("img")
    const sources = Array.from(imgElements).map((img) => img.src)
    return sources
  } catch (error) {
    console.error("Could not parse HTML: ", error)
    return []
  }
}

export function extractLinks(text: string): string[] {
  const urlRegex = /https?:\/\/[^"'>\s]+/g
  const matches = text.match(urlRegex)
  return matches ? matches : []
}
