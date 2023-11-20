"use client"

import { useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useFormContext } from 'react-hook-form';
import { MAIN_IMAGE , TITLE, DESCRIPTION} from '@/constants';
import { Label } from "@/components/ui/label"

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
              <Label htmlFor="name">Name</Label>

        <Input
          id="name"
          placeholder="Name"
          required
          {...register(TITLE, {
            required: true,
            minLength: { value: 1, message: '' },
          })}
        />
      </div>
      <div className="mb-4">

             <Label htmlFor="description">Description</Label>
        <Textarea
                 id="description"

          placeholder="Token description"
          {...register(DESCRIPTION, {
            required: true,
          })}
        >Description</Textarea>
      </div>
      <div className="mb-4">

         <Label htmlFor="picture">Picture</Label>
      <Input
         {...register(MAIN_IMAGE, {
            required: true,
            validate: () => true,
          })}
        id="media"
        type="file"
        accept="image/png, image/jpeg"
        className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:border file:border-solid file:border-blue-700 file:rounded-md border-blue-600"
      />
        {/* <MbMediaImport
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
        /> */}
      </div>
    </>
  );
}

export default MintForm;