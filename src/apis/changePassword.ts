const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

export interface ChangePasswordData {
  currentPassword: string;
  password: string;
  rePassword: string;
}

export interface ChangePasswordResponse {
  message: string;
  token: string;
}

// Client-side function - token passed from caller
export default async function changePassword(passwordData: ChangePasswordData, token: string): Promise<ChangePasswordResponse | null> {
  try {
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(`${API_BASE_URL}/users/changeMyPassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(passwordData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to change password: ${response.status}`);
    }

    const data = await response.json();
    return data as ChangePasswordResponse;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error; // Re-throw to handle in component
  }
}
