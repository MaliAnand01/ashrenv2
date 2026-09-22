import { GeoLocation } from "./types";

export const DEFAULT_INDIAN_LOCATION: GeoLocation = {
  city: "Jaipur",
  state: "Rajasthan",
  country: "India",
  pincode: "302001",
  latitude: 26.9124,
  longitude: 75.7873,
  isPermissionGranted: false,
};

// Common Indian commercial centers for fast lookup
export const POPULAR_INDIAN_HUBS: GeoLocation[] = [
  { city: "Jaipur", state: "Rajasthan", pincode: "302001", country: "India", latitude: 26.9124, longitude: 75.7873, isPermissionGranted: true },
  { city: "Mumbai", state: "Maharashtra", pincode: "400001", country: "India", latitude: 19.0760, longitude: 72.8777, isPermissionGranted: true },
  { city: "Delhi NCR", state: "Delhi", pincode: "110001", country: "India", latitude: 28.6139, longitude: 77.2090, isPermissionGranted: true },
  { city: "Bengaluru", state: "Karnataka", pincode: "560001", country: "India", latitude: 12.9716, longitude: 77.5946, isPermissionGranted: true },
  { city: "Hyderabad", state: "Telangana", pincode: "500001", country: "India", latitude: 17.3850, longitude: 78.4867, isPermissionGranted: true },
];

export async function resolveUserLocation(): Promise<GeoLocation> {
  if (typeof window === "undefined" || !navigator.geolocation) {
    return DEFAULT_INDIAN_LOCATION;
  }

  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      resolve(DEFAULT_INDIAN_LOCATION);
    }, 4500);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        clearTimeout(timeoutId);
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { signal: AbortSignal.timeout(3000) }
          );
          if (!res.ok) throw new Error("Geo lookup error");
          const data = await res.json();
          
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.suburb ||
            data.address?.state_district ||
            "Jaipur";
          const state = data.address?.state || "Rajasthan";
          const pincode = data.address?.postcode || "302001";

          resolve({
            city,
            state,
            country: "India",
            pincode,
            latitude,
            longitude,
            isPermissionGranted: true,
          });
        } catch {
          resolve({
            ...DEFAULT_INDIAN_LOCATION,
            latitude,
            longitude,
            isPermissionGranted: true,
          });
        }
      },
      () => {
        clearTimeout(timeoutId);
        resolve(DEFAULT_INDIAN_LOCATION);
      },
      { timeout: 4000, maximumAge: 300000 }
    );
  });
}
