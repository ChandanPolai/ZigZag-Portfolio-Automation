
export function APIError(status: number, message: string, details?: any) {
    return Response.json(
      { success: false, message, details: details ? details : {} },
      { status }
    );
  }
  