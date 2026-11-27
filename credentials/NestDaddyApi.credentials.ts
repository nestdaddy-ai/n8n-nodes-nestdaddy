import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class NestDaddyApi implements ICredentialType {
	name = 'nestDaddyApi';

	displayName = 'NestDaddy API';

	icon: Icon = 'file:../icons/nestdaddy.svg';

	documentationUrl = 'https://nestdaddy.com/integrations/n8n';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Your NestDaddy API key, from https://nestdaddy.com/dashboard',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	// Checks the key without using any credits.
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://nestdaddy.com',
			url: '/searxng/config',
			method: 'GET',
		},
	};
}
