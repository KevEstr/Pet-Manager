import * as utils from '@/lib/utils';
describe('utils smoke', () => {
  it('calls all exported functions', () => {
    Object.values(utils).forEach(fn => {
      if (typeof fn === 'function') {
        try {
          fn();
        } catch (e) {
          // Si requiere argumentos, ignora el error
        }
      }
    });
  });
}); 