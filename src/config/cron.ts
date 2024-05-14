import { CronCommand, CronJob } from "cron";


interface Props{
    cronTime:string,
    onTick:CronCommand<null, boolean>,
    onComplete:any,
    start:boolean | null | undefined

    // * * * * *
    // - - - - -
    // | | | | |
    // | | | | +---- Día de la semana (0 - 7) (Domingo= 0 o 7)
    // | | | +------ Mes (1 - 12)
    // | | +-------- Día del mes (1 - 31)
    // | +---------- Hora (0 - 23)
    // +------------ Minuto (0 - 59)
}


export class CronAdapter{

    private readonly job: CronJob;

    constructor(
        config: Props
    ){
        const {cronTime, onComplete, onTick, start} = config;
        this.job = new CronJob(cronTime, onTick, onComplete, start);
    };

    stop(){
        try {
            this.job.stop();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
}