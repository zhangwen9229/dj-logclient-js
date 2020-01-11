import test from 'ava';
// import { marshalTx } from '../lib/web.js'
import DJReport from './DJReport';

test('init DJReport', async t => {
    const djReport = new DJReport({
        baseUrl: 'ws://47.103.78.91:26657'
    });

    t.log(djReport);

    t.pass();
});
