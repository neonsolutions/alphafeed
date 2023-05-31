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
  const mediaExtensions = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".bmp",
    ".webp",
    ".mp4",
    ".mp3",
    ".wav",
    ".ogg",
    ".flac",
    ".mov",
    ".avi",
  ]

  const matches = text.match(urlRegex)
  if (!matches) {
    return []
  }

  // Filter out media links
  const nonMediaLinks = matches.filter((url) => {
    const extension = new URL(url).pathname.split(".").pop()
    return !mediaExtensions.includes(`.${extension}`)
  })

  return nonMediaLinks
}
