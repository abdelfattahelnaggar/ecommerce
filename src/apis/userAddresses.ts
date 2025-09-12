const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

export interface UserAddress {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddressesResponse {
  status: string;
  data: UserAddress[];
}

export interface AddAddressData {
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddAddressResponse {
  status: string;
  message: string;
  data: UserAddress;
}

// Client-side function - token passed from caller
export default async function getUserAddresses(token: string): Promise<AddressesResponse | null> {
  try {
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(`${API_BASE_URL}/addresses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch addresses: ${response.status}`);
    }

    const data = await response.json();
    return data as AddressesResponse;
  } catch (error) {
    console.error("Error fetching user addresses:", error);
    return null;
  }
}

// Add new address
export async function addAddress(addressData: AddAddressData, token: string): Promise<AddAddressResponse | null> {
  try {
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(`${API_BASE_URL}/addresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(addressData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add address: ${response.status}`);
    }

    const data = await response.json();
    return data as AddAddressResponse;
  } catch (error) {
    console.error("Error adding address:", error);
    return null;
  }
}

// Delete address
export async function deleteAddress(addressId: string, token: string): Promise<boolean> {
  try {
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(`${API_BASE_URL}/addresses/${addressId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Error deleting address:", error);
    return false;
  }
}
