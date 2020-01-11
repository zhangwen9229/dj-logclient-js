/**
 * 获取设备是安卓、IOS  还是PC端
 */
export function getDevices() {
    if ((global as any).navigator) {
        return null;
    }
    const u =(global as any).navigator.userAgent;
    if (/(iPhone|iPad|iPod|iOS)/i.test(u)) {
        return 'IOS';
    } else if (/(Android)/i.test(u)) {
        return 'Android';
    } else {
        return 'PC';
    }
}
