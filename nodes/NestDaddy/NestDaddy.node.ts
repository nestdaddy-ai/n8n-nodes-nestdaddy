import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';

const showFor = (operation: string) => ({ show: { operation: [operation] } });

export class NestDaddy implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'NestDaddy',
		name: 'nestDaddy',
		icon: { light: 'file:../../icons/nestdaddy.svg', dark: 'file:../../icons/nestdaddy.dark.svg' },
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Live web search, real-time news search and clean page text from NestDaddy',
		defaults: {
			name: 'NestDaddy',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'nestDaddyApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://nestdaddy.com',
			headers: {
				Accept: 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Web Search',
						value: 'webSearch',
						action: 'Search the web',
						description: 'Get ranked web results for a query, with recent news blended in for current topics',
						routing: {
							request: { method: 'GET', url: '/api/v1/search' },
							output: {
								postReceive: [{ type: 'rootProperty', properties: { property: 'results' } }],
							},
						},
					},
					{
						name: 'News Search',
						value: 'newsSearch',
						action: 'Search the news',
						description: 'Find news articles by key words, newest and best match first',
						routing: {
							request: { method: 'GET', url: '/api/v1/news/search' },
							output: {
								postReceive: [{ type: 'rootProperty', properties: { property: 'results' } }],
							},
						},
					},
					{
						name: 'Read Page',
						value: 'readPage',
						action: 'Read the text of a web page',
						description: 'Get the clean text, title and publish date of one page',
						routing: {
							request: { method: 'GET', url: '/api/v1/extract' },
						},
					},
				],
				default: 'webSearch',
			},

			// ----- Web Search
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'e.g. best open source vector database',
				description: 'What to search for',
				displayOptions: showFor('webSearch'),
				routing: { send: { type: 'query', property: 'q' } },
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 50 },
				default: 50,
				description: 'Max number of results to return',
				displayOptions: showFor('webSearch'),
				routing: { send: { type: 'query', property: 'limit' } },
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				placeholder: 'e.g. US',
				description: 'Optional two-letter country code to prefer results for that country',
				displayOptions: showFor('webSearch'),
				routing: { send: { type: 'query', property: 'country' } },
			},

			// ----- News Search
			{
				displayName: 'Query',
				name: 'newsQuery',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'e.g. electric vehicles',
				description: 'Key words to find in news articles',
				displayOptions: showFor('newsSearch'),
				routing: { send: { type: 'query', property: 'q' } },
			},
			{
				displayName: 'Days',
				name: 'days',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 120 },
				default: 7,
				description: 'How many days back to search',
				displayOptions: showFor('newsSearch'),
				routing: { send: { type: 'query', property: 'days' } },
			},
			{
				displayName: 'Limit',
				name: 'newsLimit',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 50 },
				default: 10,
				description: 'Max number of results to return',
				displayOptions: showFor('newsSearch'),
				routing: { send: { type: 'query', property: 'limit' } },
			},
			{
				displayName: 'Country',
				name: 'newsCountry',
				type: 'string',
				default: '',
				placeholder: 'e.g. GB',
				description: 'Optional two-letter country code to only get news from that country',
				displayOptions: showFor('newsSearch'),
				routing: { send: { type: 'query', property: 'country' } },
			},

			// ----- Read Page
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'e.g. https://example.com/article',
				description: 'The page to read',
				displayOptions: showFor('readPage'),
				routing: { send: { type: 'query', property: 'url' } },
			},
			{
				displayName: 'Max Characters',
				name: 'maxChars',
				type: 'number',
				typeOptions: { minValue: 500, maxValue: 30000 },
				default: 12000,
				description: 'Longest text to return; longer pages are cut and marked as truncated',
				displayOptions: showFor('readPage'),
				routing: { send: { type: 'query', property: 'max_chars' } },
			},
		],
	};
}
