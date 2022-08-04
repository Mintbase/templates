import { useEffect } from 'react'
import {
  EControlStatus,
  IMAGE_TYPES,
  MbInput,
  MbAmountInput,
  MbChip,
  MbInputTags,
  MbMediaImport,
  MbText,
  MbTextArea,
} from 'mintbase-ui'
import { useFormContext } from 'react-hook-form'
import { EInputType } from '../utils/types'
import { tags } from "../utils/constants";

const MintForm = () => {
  const {
    register,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { dirtyFields, errors },
  } = useFormContext()

  const uploadFile = (file: File) => {
    setValue(EInputType.MAIN_IMAGE, file)
    clearErrors(EInputType.MAIN_IMAGE)
  }

  const removeFile = () => {
    setValue(EInputType.MAIN_IMAGE, null)
    setError(
      EInputType.MAIN_IMAGE,
      {
        type: 'required',
        message: 'No image',
      },
      { shouldFocus: true }
    )
  }    

  const handleSelectCategory = (value: string) => {
    const currentValue = getValues(EInputType.CATEGORY)
    if (value === currentValue) {
      setValue(EInputType.CATEGORY, null)
      return
    }
    setValue(EInputType.CATEGORY, value)
  }

  useEffect(() => {
    setError(
      EInputType.MAIN_IMAGE,
      {
        type: 'required',
        message: 'No image',
      },
      { shouldFocus: true }
    )
  }, [])
  
  return (
    <>
      <div className='mb-4'>
        <MbInput
          controlStatus={EControlStatus.NORMAL}
          label="Name"
          placeholder="Name"
          required
          {...register(EInputType.TITLE, {
            required: true,
            minLength: { value: 1, message: '' },
          })}
        />
      </div>
      <div className='mb-4'>
        <MbTextArea
          controlStatus={EControlStatus.NORMAL}
          label="Description"
          placeholder="Token description"
          {...register(EInputType.DESCRIPTION, {
            required: true,
          })}
        />
      </div>
      <div className='mb-4'>
        <MbText className="p-med-90 mb-4">
          Image
        </MbText>
        <MbMediaImport
          {...register(EInputType.MAIN_IMAGE, {
            required: true,
            validate: (value) => {
              return true
            },
          })}
          acceptedFormats={IMAGE_TYPES}
          handleFileAdd={uploadFile}
          handleFileRemove={removeFile}
          idealDimensions="1:1"
          maxFileSize={5}
          uploadedFile={watch(EInputType.MAIN_IMAGE)}
        />
      </div>
      <div className='mb-4'>
        <MbText className="p-med-90 mb-4">
          Amount of items to mint{' '}
        </MbText>
        <MbAmountInput
          maxAmount={50}
          onBlur={(e) => {
            e.preventDefault()
            setValue(EInputType.MINT_AMOUNT, e.target.value)
          }}
          onValueChange={(amount) => {
            setValue(EInputType.MINT_AMOUNT, amount)
          }}
        />
      </div>
      <div className='mb-4'>
        <MbText className="p-med-90 mb-4">Category</MbText>
        <div className="flex pt-4 gap-4 overflow-scroll w-full no-scrollbar">
          {Object.keys(tags).map((tag, index) => (
            <MbChip
              key={`${tag}-${index}`}
              isChecked={watch(EInputType.CATEGORY) === tag}
              handleClick={() => handleSelectCategory(tag)}
              disabled={false}
              label={tags[tag as keyof typeof tags]}
              {...register(`categories`)}
            ></MbChip>
          ))}
        </div>
      </div>

      <div className='mb-4'>
        <MbInputTags
          label="Tags"
          maxTags={4}
          placeholder="Add up to 4 tags to improve discoverability"
          onTagsChange={(tags) => {
            setValue(EInputType.TAGS, tags)
          }}
          onMaxTags={() => console.log('mx')}
        />
      </div>
    </>
        
  );
}

export default MintForm;
