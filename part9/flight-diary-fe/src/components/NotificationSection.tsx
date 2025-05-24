import { ErrorMessage } from '../types';

interface NotificationSectionProps {
  errors: ErrorMessage[];
}

const NotificationSection = ({ errors }: NotificationSectionProps) => {
  return (
    <div>
      {errors.map((error, index) => (
        <div key={index} style={{ color: 'red', marginBottom: '10px' }}>
          {error.error}
        </div>
      ))}
    </div>
  );
}

export default NotificationSection
