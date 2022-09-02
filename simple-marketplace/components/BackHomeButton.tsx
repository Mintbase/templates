import { MbButton } from 'mintbase-ui';
import { useRouter } from 'next/router';

export function BackHomeButton(): JSX.Element {
  const router = useRouter();

  const goHome = () => {
    router.push('/');
  };

  return (
    <div className="mt-4">
      <MbButton onClick={goHome} label="Back to Home Page" />
    </div>
  );
}
