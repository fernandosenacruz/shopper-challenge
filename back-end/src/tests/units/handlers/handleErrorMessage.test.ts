import StatusCodes from '../../../app/helpers/statusCodes';
import MESSAGES from '../../../app/helpers/messages';
import handleErrorMessages from '../../../app/handlers/handleErrorMessage';

describe('handleErrorMessages', () => {
  it('should return correct error for USER_NOT_FOUND', () => {
    const error = 'Usuário não encontrado';
    const result = handleErrorMessages(MESSAGES.USER_NOT_FOUND);

    expect(result).toEqual({
      status: StatusCodes.NOT_FOUND,
      json: {
        message: MESSAGES.USER_NOT_FOUND,
        error_code: 'USER_NOT_FOUND',
        error_description: error,
      },
    });
  });

  it('should return correct error for DRIVER_NOT_FOUND', () => {
    const error = 'Motorista não encontrado';
    const result = handleErrorMessages(MESSAGES.DRIVER_NOT_FOUND);

    expect(result).toEqual({
      status: StatusCodes.NOT_FOUND,
      json: {
        message: MESSAGES.DRIVER_NOT_FOUND,
        error_code: 'DRIVER_NOT_FOUND',
        error_description: error,
      },
    });
  });

  it('should return correct error for INVALID_DISTANCE', () => {
    const error = 'INVALID_DISTANCE';
    const result = handleErrorMessages(MESSAGES.INVALID_DISTANCE);

    expect(result).toEqual({
      status: StatusCodes.BAD_REQUEST,
      json: {
        message: MESSAGES.DISTANCE_NOT_ACEPTABLE,
        error_code: 'INVALID_DISTANCE',
        error_description: error,
      },
    });
  });

  it('should return correct error for GEOCODE_ERROR', () => {
    const error = 'Erro ao obter a geolocalização do endereço';
    const result = handleErrorMessages(MESSAGES.GEOCODE_ERROR);

    expect(result).toEqual({
      status: StatusCodes.BAD_REQUEST,
      json: {
        message: MESSAGES.GEOCODE_ERROR,
        error_code: MESSAGES.INVALID_DATA,
        error_description: error,
      },
    });
  });

  it('should return default error for unhandled errors', () => {
    const error = 'UNKNOWN_ERROR';
    const result = handleErrorMessages('UNKNOWN_ERROR');

    expect(result).toEqual({
      status: StatusCodes.BAD_REQUEST,
      json: {
        message: MESSAGES.NOT_FOUND,
        error_code: MESSAGES.NO_RIDES_FOUND,
        error_description: error,
      },
    });
  });
});
