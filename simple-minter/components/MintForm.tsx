import { useEffect } from 'react';
import {
  EControlStatus,
  IMAGE_TYPES,
  MbInput,
  MbMediaImport,
  MbText,
  MbTextArea,
} from 'mintbase-ui';
import { useFormContext } from 'react-hook-form';
import { DESCRIPTION, MAIN_IMAGE, TITLE } from '../constants';

function MintForm() {

  const {
    register,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useFormContext();

  const uploadFile = (file: File) => {
    setValue(MAIN_IMAGE, file);
    clearErrors(MAIN_IMAGE);
  };

  const removeFile = () => {
    setValue(MAIN_IMAGE, null);
    setError(
      MAIN_IMAGE,
      {
        type: 'required',
        message: 'No image',
      },
      { shouldFocus: true },
    );
  };

  useEffect(() => {
    setError(
      MAIN_IMAGE,
      {
        type: 'required',
        message: 'No image',
      },
      { shouldFocus: true },
    );
  }, [setError]);

  return (
    <>
      <div className="mb-4">
        <MbInput
          controlStatus={EControlStatus.NORMAL}
          label="Name"
          placeholder="Name"
          required
          {...register(TITLE, {
            required: true,
            minLength: { value: 1, message: '' },
          })}
        />
      </div>
      <div className="mb-4">
        <MbTextArea
          controlStatus={EControlStatus.NORMAL}
          label="Description"
          placeholder="Token description"
          {...register(DESCRIPTION, {
            required: true,
          })}
        />
      </div>
      <div className="mb-4">
        <MbText className="p-med-90 mb-4">Image</MbText>
        <MbMediaImport
          {...register(MAIN_IMAGE, {
            required: true,
            validate: () => true,
          })}
          acceptedFormats={IMAGE_TYPES}
          handleFileAdd={uploadFile}
          handleFileRemove={removeFile}
          idealDimensions="1:1"
          maxFileSize={5}
          uploadedFile={watch(MAIN_IMAGE)}
        />
      </div>
    </>
  );
}

export default MintForm;