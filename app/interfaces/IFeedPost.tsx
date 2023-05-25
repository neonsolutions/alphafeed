export enum SourceType {
  Twitter = "twitter",
  Internet = "internet",
  News = "news",
  Research = "research",
}

export interface IFeedPost {
  title: string
  body: string
  scores: { significance: number; relevance: number; impact: number; novelty: number; reliability: number }
  media: string[] | null
  source: SourceType
  link: string
  externalLinks: string[] | null
  publishedAt: string // ISO Date String
}
