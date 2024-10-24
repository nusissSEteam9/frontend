class InvalidateInfoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidateInfoError';
  }
}
export default InvalidateInfoError;
