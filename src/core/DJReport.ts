import { msgType } from './common/enums';
import { ajax } from './utils/ajax';
import { getDevices } from './utils/index';

class DJReport {
    public readonly config: {
        readonly baseUrl: string;
    };

    public constructor(config: { readonly baseUrl: string }) {
        this.config = config;
    }

    public async report(
        {
            msg,
            extra,
            url,
            device
        }: { msg: any; extra?: any; url?: string; device?: string },
        msgType: msgType
    ) {
        try {
            const ua = !!(global as any).navigator ? (global as any).navigator.userAgent : '';
            const data: any = {
                msgType,
                msg,
                extra,
                os: getDevices() || device,
                url: !!window ? window.location.href : url,
                ua
            };
            // tslint:disable-next-line: no-console
            console.log('djreport.report data: ', data);
            const res = await ajax({
                url: this.config.baseUrl,
                data,
                type: 'POST'
            });
            // tslint:disable-next-line: no-console
            console.log(res);
        } catch (error) {
            // tslint:disable-next-line: no-console
            console.log('DJReport.report Error:', error);
        }
    }
}

export default DJReport;
