export type BlogMarket = 'IN' | 'GB' | 'US' | 'GLOBAL';
export declare const BLOG_MARKETS: Record<string, BlogMarket>;
/** India and jurisdiction-neutral slugs only — see blogMarkets.mjs. */
export declare function visibleBlogSlugs(): string[];
