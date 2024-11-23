import MESSAGES from '../helpers/messages';
import StatusCodes from '../helpers/statusCodes';

export const handleErrorUserNotFound = (error: string) => {
  return {
    status: StatusCodes.NOT_FOUND,
    json: {
      message: MESSAGES.USER_NOT_FOUND,
      error_code: 'USER_NOT_FOUND',
      error_description: error,
    },
  };
};

export const handleErrorDriverNotFound = (error: string) => {
  return {
    status: StatusCodes.NOT_FOUND,
    json: {
      message: MESSAGES.DRIVER_NOT_FOUND,
      error_code: 'DRIVER_NOT_FOUND',
      error_description: error,
    },
  };
};

export const handleErrorInvalidDistance = (error: string) => {
  return {
    status: StatusCodes.BAD_REQUEST,
    json: {
      message: MESSAGES.DISTANCE_NOT_ACEPTABLE,
      error_code: 'INVALID_DISTANCE',
      error_description: error,
    },
  };
};

export const handleErrorRideBadRequest = (error: string) => {
  return {
    status: StatusCodes.BAD_REQUEST,
    json: {
      message: MESSAGES.RIDE_BAD_REQUEST,
      error_code: MESSAGES.INVALID_DATA,
      error_description: error,
    },
  };
};

export const handleErrorGeocodeError = (error: string) => {
  return {
    status: StatusCodes.BAD_REQUEST,
    json: {
      message: MESSAGES.GEOCODE_ERROR,
      error_code: MESSAGES.INVALID_DATA,
      error_description: error,
    },
  };
};

const handleErrorMessages = (error: string) => {
  switch (error) {
    case MESSAGES.USER_NOT_FOUND:
      return handleErrorUserNotFound(error);
    case MESSAGES.DRIVER_NOT_FOUND:
      return handleErrorDriverNotFound(error);
    case MESSAGES.INVALID_DISTANCE:
      return handleErrorInvalidDistance(error);
    case MESSAGES.GEOCODE_ERROR:
      return handleErrorGeocodeError(error);
    default:
      return handleErrorRideBadRequest(error);
  }
};

export default handleErrorMessages;
