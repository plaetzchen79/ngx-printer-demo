import { PdfPrinter } from './pdf-printer';

describe('PdfPrinter', () => {
  it('should create an instance', () => {
    expect(new PdfPrinter()).toBeTruthy();
  });
});
