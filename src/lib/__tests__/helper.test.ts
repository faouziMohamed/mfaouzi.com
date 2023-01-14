import { openGraphImage } from '@/lib/helper';

describe('Open Graph function should work correctly', () => {
  it('should not return templateTitle when not specified', () => {
    const result = openGraphImage({
      description: 'Test description',
      siteName: 'Test site name',
    });
    expect(result).not.toContain('&templateTitle=');
  });

  it('should return templateTitle when specified', () => {
    const result = openGraphImage({
      templateTitle: 'Test Template Title',
      description: 'Test description',
      siteName: 'Test site name',
    });
    expect(result).toContain('&templateTitle=Test+Template+Title');
  });
});
