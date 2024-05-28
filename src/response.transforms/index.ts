enum HttpCodes {
  OkResponse = 200,
  NotFoundResponse = 404,
  InternalServerErrorResponse = 500,
  BadRequestResponse = 400,
  ResourceCreatedResponse = 201,
}

class ResponseTransforms {
  constructor() {}

  static transformResponse(
    status: HttpCodes,
    message: string | undefined | null,
    data?: any,
    errors?: any,
  ) {
    const responseFormatDefaults = {
      data: {},
      message: "",
    };
    return {
      ...responseFormatDefaults,
      status,
      message,
      data,
      errors,
    };
  }
}

export { ResponseTransforms, HttpCodes };
