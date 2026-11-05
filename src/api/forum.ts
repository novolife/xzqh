import { fetchHtml, parseDocument } from '@/lib/http';
import { parseIndexFeeds, parseIndexFooter, parseIndexForums } from '@/parsers/index';
import type { ForumCategory, IndexFeedItem, IndexFooterInfo } from '@/lib/types';

export async function fetchForumIndex(): Promise<{
  categories: ForumCategory[];
  latestTopics: IndexFeedItem[];
  recentReplies: IndexFeedItem[];
  footer: IndexFooterInfo;
}> {
  const { html } = await fetchHtml('index.php');
  const doc = parseDocument(html);
  const feeds = parseIndexFeeds(doc);
  return {
    categories: parseIndexForums(doc),
    latestTopics: feeds.latestTopics,
    recentReplies: feeds.recentReplies,
    footer: parseIndexFooter(doc),
  };
}
