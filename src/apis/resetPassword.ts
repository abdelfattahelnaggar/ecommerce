const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

export interface ForgotPasswordData {
  email: string;
}

export interface VerifyResetCodeData {
  resetCode: string;
}

export interface ResetPasswordData {
  email: string;
  newPassword: string;
}

export interface ForgotPasswordResponse {
  statusMsg: string;
  message: string;
}

export interface VerifyResetCodeResponse {
  status: string;
}

export interface ResetPasswordResponse {
  token: string;
}

// Step 1: Send forgot password email
export async function forgotPassword(data: ForgotPasswordData): Promise<ForgotPasswordResponse | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/forgotPasswords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to send reset email: ${response.status}`);
    }

    const result = await response.json();
    return result as ForgotPasswordResponse;
  } catch (error) {
    console.error("Error sending forgot password email:", error);
    throw error;
  }
}

// Step 2: Verify reset code
export async function verifyResetCode(data: VerifyResetCodeData): Promise<VerifyResetCodeResponse | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verifyResetCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Invalid reset code: ${response.status}`);
    }

    const result = await response.json();
    return result as VerifyResetCodeResponse;
  } catch (error) {
    console.error("Error verifying reset code:", error);
    throw error;
  }
}

// Step 3: Reset password
export async function resetPassword(data: ResetPasswordData): Promise<ResetPasswordResponse | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/resetPassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to reset password: ${response.status}`);
    }

    const result = await response.json();
    return result as ResetPasswordResponse;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
}
