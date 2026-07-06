import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInForm } from '../../components/SignIn'

describe('SignIn', () => {
  describe('SignInForm', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn()

      await render(<SignInForm onSubmit={onSubmit} />);
      await fireEvent.changeText(screen.getByTestId('username'), 'kalle');
      await fireEvent.changeText(screen.getByTestId('password'), 'password');
      await fireEvent.press(screen.getByText('Submit'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({ username: 'kalle', password: 'password' });
      });
    });
  });
});
