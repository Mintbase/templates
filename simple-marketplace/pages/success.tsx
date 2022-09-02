import { EIconName, MbIcon, MbText } from 'mintbase-ui';
import { BackHomeButton } from '../components/BackHomeButton';
import { Container } from '../components/Container';

export function SuccessPage(): JSX.Element {
  return (
    <Container>
      <div className="my-52 w-full flex flex-col items-center justify-center gap-12">
        <MbIcon
          name={EIconName.SUCCESS}
          size="50px"
          color="success-300"
          darkColor="success-100"
        />

        <MbText className="h3-130 text-center font-bold text-black m-4">
          Success!
        </MbText>
        <MbText className="p-big-90 text-center text-gray-300 text-gray-700">
          Your transaction was successful.
        </MbText>

        <BackHomeButton />
      </div>
    </Container>
  );
}

export default SuccessPage;
