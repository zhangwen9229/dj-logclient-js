import { msgType } from './common/enums';
import { ajax } from './utils/ajax';
import { getDevices } from './utils/index';

interface IConfig {
    os?: string;
    readonly baseUrl?: string;
    readonly isReport?: boolean;
}

interface IInfo {
    os?: string;
    msg: any;
    extra?: any;
    url?: string;
}

class DJReport {
    public readonly config: IConfig;

    public constructor(config: IConfig = { isReport: false }) {
        this.config = config;
    }

    public async report({ msg, extra, url, os }: IInfo, msgType: msgType) {
        if (!this.config.isReport) {
            return;
        }
        try {
            const ua = !!(global as any).navigator
                ? (global as any).navigator.userAgent
                : '';
            const data: any = {
                msgType,
                msg,
                extra,
                os: os || this.config.os || getDevices(),
                url:
                    url ||
                    (!!window && !!window.location ? window.location.href : ''),
                ua
            };

            
            // tslint:disable-next-line: no-console
            // console.log('djreport.report data: ', data);
            // const res =
            await ajax({
                url: this.config.baseUrl,
                data,
                type: 'POST'
            });
            // tslint:disable-next-line: no-console
            // console.log(res);
        } catch (error) {
            // tslint:disable-next-line: no-console
            // console.log('DJReport.report Error:', error);
        }
    }
}

export default DJReport;
