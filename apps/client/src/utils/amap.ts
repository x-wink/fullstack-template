/* eslint-disable @typescript-eslint/no-explicit-any */
import AMapLoader from '@amap/amap-jsapi-loader';
(window as unknown as Record<string, unknown>)._AMapSecurityConfig = {
    securityJsCode: 'd97e65210291eab4d2c98bed1c925be3',
};
export const schoolLocation = [0, 0];
let AMap: any;
let geocoder: any;
let geolocation: any;

const init = async () => {
    if (schoolLocation[0] && schoolLocation[1]) return;
    AMap = await AMapLoader.load({
        key: '299da8ed23a38aa6486a1f0f6e6a1df1',
        version: '2.0',
        plugins: ['AMap.Geolocation', 'AMap.Geocoder'],
    });

    geocoder = new AMap.Geocoder({ city: '上海', radius: 500 });
    geolocation = new AMap.Geolocation();

    return new Promise<void>((resolve, reject) => {
        geocoder.getLocation(
            '复旦大学枫林校区',
            (status: string, result: { geocodes: { location: { lng: number; lat: number } }[] }) => {
                if (status === 'complete') {
                    console.info('学校位置：', result);
                    const { lng, lat } = result.geocodes[0].location;
                    schoolLocation[0] = lng;
                    schoolLocation[1] = lat;
                    resolve();
                } else {
                    reject({ status, result });
                }
            }
        );
    });
};
init();
export const getAddress = async (lng: number, lat: number) => {
    await init();
    return new Promise<string>((resolve, reject) => {
        geocoder.getAddress(
            new AMap.LngLat(lng, lat),
            (status: string, result: { regeocode: { formattedAddress: string } }) => {
                if (status === 'complete') {
                    resolve(result.regeocode.formattedAddress);
                } else {
                    reject({ status, result });
                }
            }
        );
    });
};
export const getCurrentPosition = async () => {
    await init();
    return new Promise<{ lng: number; lat: number; address: string }>((resolve, reject) => {
        geolocation.getCurrentPosition(async (status: string, result: { position: { lng: number; lat: number } }) => {
            if (status === 'complete') {
                try {
                    const address = await getAddress(result.position.lng, result.position.lat);
                    resolve({
                        lng: result.position.lng,
                        lat: result.position.lat,
                        address,
                    });
                } catch (e) {
                    reject(e);
                }
            } else {
                console.error(status, result);
                reject({ status, result });
            }
        });
    });
};
export const getDistance = (from: [number, number], to: [number, number]) =>
    AMap ? new AMap.LngLat(from[0], from[1]).distance(new AMap.LngLat(to[0], to[1])) : 0;
