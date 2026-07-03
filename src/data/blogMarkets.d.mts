export type BlogMarket = 'IN' | 'GLOBAL' | 'ROW';
export declare const BLOG_MARKETS: Record<string, BlogMarket>;
export declare function visibleBlogSlugs(indiaOnly: boolean): string[];
