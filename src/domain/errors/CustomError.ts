import { DiscordWebhook, envs } from "../../config";


export class CustomError extends Error{

    constructor( public readonly message: string, public readonly level: number ){
        super(message)
    };


    static badRequest( message: string ){
        return new CustomError( message, 404 );
    }


    static unauthorized( message: string ){
        return new CustomError( message, 401 );
    }

    static internalServerError( message: string ){
        //* Llamamos al webhook de discord
        new DiscordWebhook(envs.DISCORD_HOOK_ERROR)
            .notify(message, {
                image: {
                    url: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYThieGxoczY4OGQ0M25wOGw2bnAwbThiYTE0MXN0b2w3cmI0MWt1ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FmQaBsZSBs6buQE/giphy.gif'
                }
            });

        return new CustomError('Internal Server Error!', 500 );
    }

}
