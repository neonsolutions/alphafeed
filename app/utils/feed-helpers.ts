import { JSDOM } from "jsdom"

export function extractMediaSources(text: string): { images: string[]; videos: string[] } {
  try {
    const dom = new JSDOM(text)
    const imgElements = dom.window.document.getElementsByTagName("img")
    const vidElements = dom.window.document.querySelectorAll("video source")

    return {
      images: Array.from(imgElements).map((img) => img.src),
      videos: Array.from(vidElements).map((vid) => (vid as any).src),
    }
  } catch (error) {
    console.error("Could not parse HTML: ", error)
    return {
      images: [],
      videos: [],
    }
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

  const ignoreDomains = ["twitter.com", "nitter.net"]

  const matches = text.match(urlRegex)
  if (!matches) {
    return []
  }

  // Filter out media links
  const nonMediaLinks = matches.filter((url) => {
    const extension = new URL(url).pathname.split(".").pop()
    return !mediaExtensions.includes(`.${extension}`)
  })

  // Filter out ignored domains
  const filteredLinks = nonMediaLinks.filter((url) => {
    const domain = new URL(url).hostname
    return !ignoreDomains.includes(domain)
  })

  return filteredLinks
}
