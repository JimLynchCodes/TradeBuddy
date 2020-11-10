

export interface NewsFeedItemBulletPoint {
    text: string
}

export interface NewsFeedItem {
    title: string
    description: string
    bulletPoints: NewsFeedItemBulletPoint[]
}