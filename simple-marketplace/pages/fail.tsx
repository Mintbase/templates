import { MbText, EIconName, MbIcon } from 'mintbase-ui';
import { Container } from '../components/Container';

function FailPage(): JSX.Element {
  return (
    <Container>
      <div className="my-52 w-full flex flex-col items-center justify-center gap-12">
        <MbIcon
          name={EIconName.ERROR}
          size="50px"
          color="error-300"
          darkColor="error-100"
        />

        <MbText className="h3-130 text-center font-bold dark:text-white text-black m-4">
          Error!
        </MbText>
        <MbText className="p-big-90 text-center dark:text-gray-300 text-gray-700">
          Your transaction was not successful.
        </MbText>
      </div>
    </Container>
  );
}

export default FailPage;
