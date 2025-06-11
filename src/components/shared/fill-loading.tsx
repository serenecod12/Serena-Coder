import { LuLoader2 } from 'react-icons/lu'
import { Skeleton } from '../ui/skeleton'

const FillLoading = () => {
	return (
		<Skeleton className='absolute inset-0 flex justify-center items-center w-full h-full opacity-20 z-50 bg-background'>
			<LuLoader2 className='animate-spin w-6 h-6' />
		</Skeleton>
	)
}

export default FillLoading
