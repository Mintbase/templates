import { useState } from 'react'
import { EState, MbButton, MbText } from 'mintbase-ui'
import { FormProvider, useForm } from 'react-hook-form'
import { MetadataField } from 'mintbase'

import { useWallet } from "../../../services/providers/WalletProvider"
import { EInputType } from '../utils/types'
import MintForm from './MintForm';

const Main = () => {
  const { wallet, isConnected, signIn} = useWallet()
  const [isMinting, setIsMinting] = useState(false)

  const store = process.env.NEXT_PUBLIC_STORE_ID || ''

  const methods = useForm({
    defaultValues: {
      [EInputType.TITLE]: '',
      [EInputType.DESCRIPTION]: '',
      [EInputType.MINT_AMOUNT]: 1,
      [EInputType.CATEGORY]: null,
      [EInputType.LOCATION]: null,
      [EInputType.MAIN_IMAGE]: null,
      [EInputType.FOREVER_MEDIA]: null,
      [EInputType.FOREVER_DOCUMENT]: null,
      [EInputType.TAGS]: null,
      [EInputType.WEBSITE]: null,
      [EInputType.CALENDAR]: null,
      [EInputType.FOREVER_ROYALTIES]: null,
      [EInputType.SPLIT_REVENUE]: null,
      [EInputType.CUSTOM_KEY_VALUE]: null,
    },
    mode: 'onSubmit',
  })

  const { handleSubmit, getValues, formState: { errors } } = methods

  const onSubmit = async (data: { [x: string]: any }) => {
    setIsMinting(true)

    try {
      const file = getValues(EInputType.MAIN_IMAGE)
      const { data: fileUploadResult, error: fileError } =
        await wallet.minter.uploadField(MetadataField.Media, file)
      if (fileError) {
        throw new Error(fileError)
      }
    } catch (error) {
      console.error(error)
      // TODO: handle error
    }

    try {
      const file = getValues(EInputType.FOREVER_MEDIA)
      if (file) {
        const { data: fileUploadResult, error: fileError } =
          await wallet.minter.uploadField(MetadataField.Animation_url, file)
        if (fileError) {
          throw new Error(fileError)
        }
      }
    } catch (error) {
      console.error(error)
      // TODO: handle error
    }

    try {
      const file = getValues(EInputType.FOREVER_DOCUMENT)

      if (file) {
        const { data: fileUploadResult, error: fileError } =
          await wallet.minter.uploadField(MetadataField.Document, file)

        if (fileError) {
          throw new Error(fileError)
        }
      }
    } catch (error) {
      console.error(error)
      // TODO: handle error
    }

    let extra: any[] = []

    try {
      wallet.minter.setField(MetadataField.Tags, data[EInputType.TAGS])
    } catch (error) {
      console.error(error)
      // TODO: handle error here
    }

    const mintAmount = data[EInputType.MINT_AMOUNT]
    const category = data[EInputType.CATEGORY]

    const metadata = {
      title: data[EInputType.TITLE],
      description: data[EInputType.DESCRIPTION],
      extra,
      store,
      type: 'NEP171',
      category,
    }

    wallet.minter.setMetadata(metadata, true)

    const royalties = data[EInputType.FOREVER_ROYALTIES]
    const splits = data[EInputType.SPLIT_REVENUE]

    const { data: metadataId, error } = await wallet.minter.getMetadataId()

    if (error) {
      // TODO: throw error
      return
    }

    await wallet.mint(
      Number(mintAmount),
      store.toString(),
      !royalties ? undefined : royalties.royaltyArgs,
      !splits ? undefined : splits,
      category,
      {
        callbackUrl: `${window.location.origin}/success`,
        meta: JSON.stringify({
          type: 'mint',
          args: {
            contractAddress: store.toString(),
            amount: Number(mintAmount),
            thingId: `${metadataId}:${store.toString()}`,
          },
        }),
        royaltyPercentage: royalties?.percentage || 0,
        metadataId,
      }
    )
    setIsMinting(false)
  }

  const hasErrors = Object.keys(errors).length > 0

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {!isConnected && (
        <div className="w-full flex flex-col justify-center items-center space-y-8">
          <div className='flex flex-col justify-center items-center space-y-8'>
            <MbText className="text-3xl border-gray-100">
              Simple Minter
            </MbText>
            <MbText className="text-xl">
              A simple NFT Minter on Mintbase 
            </MbText>

          </div>
          <div>
            <MbButton onClick={signIn} label="Connect NEAR Wallet to Mint" />
          </div>
        </div>
      )}

      <div className="md:max-w-2xl w-full space-y-4">
        {isConnected && (
          <div className="flex flex-col items-center justify-center mt-2">
            <MbText className="text-3xl">
              Mint your NFTs
            </MbText>
      
            <div className="w-full mt-4 space-y-4">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit, (errors) => console.error(errors))}>
                  <MintForm />

                  <div className="flex justify-center items-center mt-4">
                    <MbButton
                      type="submit"
                      label="Mint Me"
                      disabled={hasErrors}
                      state={
                        hasErrors
                          ? EState.DISABLED
                          : isMinting
                          ? EState.LOADING
                          : EState.ACTIVE
                      }
                    />
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
