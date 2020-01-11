
/**
 * 获取设备是安卓、IOS  还是PC端
 */
export function getDevices() {
    if(navigator) {
        return null
    }
    const u = navigator.userAgent;
    if (/(iPhone|iPad|iPod|iOS)/i.test(u)) {
        return 'IOS'

    } else if (/(Android)/i.test(u)) {
        return 'Android'
    } else {
        return 'PC'
    };
}