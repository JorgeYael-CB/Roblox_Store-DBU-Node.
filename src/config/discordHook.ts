interface Embed {
    title?: string;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;
    footer?: {
        text: string;
        icon_url?: string;
    };
    image?: {
        url: string;
    };
    thumbnail?: {
        url: string;
    };
    author?: {
        name: string;
        url?: string;
        icon_url?: string;
    };
    fields?: {
        name: string;
        value: string;
        inline?: boolean;
    }[];
}

export class DiscordWebhook {
    constructor(
        private readonly urlWebhook: string,
    ) {}

    async notify(message: string, embed?: Embed) {
        const body = {
            content: message,
            embeds: embed ? [embed] : []
        };

        const response = await fetch(this.urlWebhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            console.log('Webhook is ok');
            return true;
        } else {
            return false;
        }
    }
}