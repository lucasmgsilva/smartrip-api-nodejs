function toRad(value: number) {
    return value * Math.PI / 180;
}

export function getDistanceBetweenCoordinatesInKm (lat1: number, lng1: number, lat2: number, lng2: number): number {
    let R = 6371; // km
    let dLat = toRad(lat2-lat1);
    let dLng = toRad(lng2-lng1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(lat1) * Math.cos(lat2); 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d = R * c;
    return d;
}