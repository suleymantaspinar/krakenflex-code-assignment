/* eslint-disable no-undef */
const { retryPromise } = require('../../../src/utils/retry-promise');
const logger = require('../../../src/utils/logger');

jest.mock('../../../src/utils/logger', () => ({
  error: jest.fn()
}));

describe('retryPromise', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should call the function once', async () => {
    const mockFn = jest.fn();

    mockFn.mockResolvedValue({ success: true });

    await retryPromise(mockFn, 5, 0);

    expect(mockFn).toBeCalledTimes(1);
  });
  it('should call the function five times', async () => {
    const mockFn = jest.fn();
    const mockError = { response: { status: 500 } };

    mockFn.mockRejectedValue(mockError).mockResolvedValue();

    try {
      await expect(retryPromise(mockFn, 5, 0));
    } catch (error) {
      expect(mockFn).toBeCalledTimes(5);
      expect(logger.error).toBeCalledTimes(4);
    }
  });
});
