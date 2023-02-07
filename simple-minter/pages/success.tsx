
import { EIconName, MbIcon, MbText } from 'mintbase-ui'
import { useRouter } from 'next/router'

const SuccessPage = () => {
    let router = useRouter()
    setTimeout(() => {
        router.push('/')
    }, 2500)
    return (
        <div className="my-52 w-full flex flex-col items-center justify-center gap-12">
            <MbIcon
                name={EIconName.SUCCESS}
                size="50px"
                color="success-300"
                darkColor="success-100"
            />

            <MbText className="h3-130 text-center font-bold dark:text-white text-black m-4">
                Success!
            </MbText>
            <MbText className="p-big-90 text-center dark:text-gray-300 text-gray-700">
                Your transaction was successful.
            </MbText>
        </div>

    )
}





export default SuccessPage
