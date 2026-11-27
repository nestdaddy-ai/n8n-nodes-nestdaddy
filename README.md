# n8n-nodes-nestdaddy

An [n8n](https://n8n.io) community node for [NestDaddy](https://nestdaddy.com): live web search, real-time news search and clean page text, for workflows and for AI Agent nodes (it can be used as a tool).

[Installation](#installation) · [Operations](#operations) · [Credentials](#credentials) · [Example](#example) · [Resources](#resources)

## Installation

Follow the [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n docs. On self-hosted n8n: **Settings > Community Nodes > Install**, then enter `n8n-nodes-nestdaddy`.

## Operations

| Operation | What it returns |
|---|---|
| **Web Search** | Ranked web results for a query (`title`, `url`, `snippet`, `domain`), with recent news blended in for current topics. One item per result. Options: limit (1-50), country. |
| **News Search** | News articles matching key words, newest and best match first (`title`, `url`, `description`, `source_domain`, `published_timestamp`, `image_url`). One item per article. Options: days back (1-120), limit (1-50), country. |
| **Read Page** | The clean text of one page with `title`, `text`, `final_url`, `published` and `truncated`. Option: max characters (500-30,000). |

The node has `usableAsTool` enabled, so an **AI Agent** node can call it to search the web or read a page before it answers.

## Credentials

1. Create a NestDaddy account at [nestdaddy.com/pricing](https://nestdaddy.com/pricing) and copy your API key from the [dashboard](https://nestdaddy.com/dashboard).
2. In n8n, create a **NestDaddy API** credential and paste the key.

The key is sent in the `X-API-Key` header. Testing the credential does not use any credits.

## Example

**Daily news digest:** Schedule Trigger → NestDaddy (News Search, query `your industry`, days 1) → AI node to summarise → Email or Slack.

**Agent with live web search:** AI Agent → add NestDaddy as a tool → ask "What changed in the EU AI Act this week?". The agent searches, reads the pages it needs and answers with sources.

## Usage and pricing

A web search or news search costs 1 credit and reading a page costs 2. See [plans](https://nestdaddy.com/pricing).

## Compatibility

Built with the n8n node CLI against n8n nodes API version 1.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [NestDaddy API docs](https://nestdaddy.com/serp-api)
- [Using NestDaddy with n8n](https://nestdaddy.com/integrations/n8n)

## License

[MIT](LICENSE.md)
