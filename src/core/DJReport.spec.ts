import test from 'ava';
import { msgType } from './common/enums';
// import { marshalTx } from '../lib/web.js'
import DJReport from './DJReport';

test('init DJReport', async t => {
    const djReport = new DJReport({
        baseUrl: 'http://127.0.0.1:7001/api/log'
    });

    t.log(djReport);

    djReport.report(
        {
            msg: 123,
            extra: {
                a: '123523523'
            }
        },
        msgType.info
    );

    t.pass();
});
