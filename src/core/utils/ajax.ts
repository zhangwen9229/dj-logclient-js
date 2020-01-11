type success = (responseText: any, responseXML: any) => void;
type fail = (status: any) => void;

export interface IOptions {
    type: string;
    url: string;
    dataType?: string;
    data?: object | string;
    success?: success;
    fail?: fail;
}

/*
 *ajax封装
 */
export function ajax(options: IOptions = { type: 'GET', url: '' }) {
    options.type = (options.type || 'GET').toUpperCase();
    options.dataType = options.dataType || 'json';
    const params = formatParams(options.data);
    let xhr;
    // tslint:disable-next-line: prefer-conditional-expression
    if ((global as any).XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new (global as any).ActiveXObject('Microsoft.XMLHTTP');
    }
    // tslint:disable-next-line: one-variable-per-declaration
    let _resolve, _reject;
    const promise = new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject
    })
    // tslint:disable-next-line: only-arrow-functions
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            const status = xhr.status;
            if (status >= 200 && status < 300) {
                options.success &&
                    options.success(xhr.responseText, xhr.responseXML);
                _resolve(xhr.responseText, xhr.responseXML)
            } else {
                options.fail && options.fail(status);
                _reject(status)
            }
        }
    };

    if (options.type === 'GET') {
        xhr.open('GET', options.url + '?' + params, true);
        xhr.send(null);
    } else if (options.type === 'POST') {
        xhr.open('POST', options.url, true);
        // 设置表单提交时的内容类型
        xhr.setRequestHeader(
            'Content-Type',
            'application/x-www-form-urlencoded'
        );
        xhr.send(params);
    }
    return promise
}

/*
 *格式化参数
 */
function formatParams(data) {
    const arr = [];
    // tslint:disable-next-line: forin
    for (const name in data) {
        arr.push(
            encodeURIComponent(name) + '=' + encodeURIComponent(data[name])
        );
    }
    arr.push(('v=' + Math.random()).replace('.', ''));
    return arr.join('&');
}
