import { msgType } from './common/enums';
import { getDevices } from './utils';
import { ajax } from './utils/ajax';

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
        }: { msg: any; extra: any; url: string; device: string },
        msgType: msgType
    ) {
        // tslint:disable-next-line: no-console
        console.log(msgType + '  -----');
        // tslint:disable-next-line: no-console
        console.log({ msg, extra });
        try {
            const data: any = {
                msgType,
                msg,
                extra,
                os: getDevices() || device,
                url: !!window ? window.location.href : url,
                ua: !navigator ? navigator.userAgent : ''
            };
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
