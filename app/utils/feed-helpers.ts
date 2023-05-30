import { JSDOM } from "jsdom"

export function extractMediaSources(text: string): string[] {
  try {
    const dom = new JSDOM(text)
    const imgElements = dom.window.document.getElementsByTagName("img")
    const vidElements = dom.window.document.querySelectorAll("video source")
    const sources = [
      ...Array.from(vidElements).map((vid) => (vid as any).src),
      ...Array.from(imgElements).map((img) => img.src),
    ]
    return sources
  } catch (error) {
    console.error("Could not parse HTML: ", error)
    return []
  }
}

export function extractLinks(text: string): string[] {
  const urlRegex = /https?:\/\/[^"'>\s]+/g
  const matches = text.match(urlRegex)
  return matches ? matches.map((match) => match.replace("nitter.net", "twitter.com")) : []
}
