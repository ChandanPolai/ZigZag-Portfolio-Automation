export function APIResponse(status: number, message: string, data?: any) {
    return Response.json({ success: status < 400, message, data: data ? data : [] }, { status });
  }
  