// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock EmailJS
jest.mock('@emailjs/browser', () => ({
  send: jest.fn().mockImplementation(() => {
    return Promise.resolve({ status: 200, text: 'OK' });
  }),
  init: jest.fn(),
}));

// Mock ReCAPTCHA
jest.mock('react-google-recaptcha', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(({ onChange }) => {
      return (
        <div data-testid="mock-recaptcha" onClick={() => onChange('test-token')}>
          Mock ReCAPTCHA
        </div>
      );
    }),
  };
});

// Cleanup after each test
afterEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = '';
});
