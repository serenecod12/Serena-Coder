import { formSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUserState } from '@/stores/user.store'
import { toast } from 'sonner'

interface Props {
	title? : string
	isEdid? : boolean
	onClosed? : () => void
	hander : (values: z.infer<typeof formSchema>) => Promise<void>
}

const TaskForm = ({title='', handler} : Props) => {

	const [isLoading, setIsLoading] = useState(false)

	const {user} = useUserState()


	const form = useForm<z.infer<typeof formSchema>>({
			resolver: zodResolver(formSchema),
			defaultValues: { title : "" },
		})

		const onSubmit = async (values: z.infer<typeof formSchema>) => {
			if(!user) return null
			const {title} = values
			setIsLoading(true)

			const promise = handler(values).finally(()=> setIsLoading(false))

			toast.promise(promise, {
				loading : "Kutamiz!!!",
				success : "Bajarildi!!!",
				error : "Uzur, qila olmayman!!"
			})
		}


	return (
		<>
	    	<Form {...form}>
	    	<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
	    		<FormField
	    			control={form.control}
	    			name="title"
	    			render={({ field }) => (
	    				<FormItem>
	    					<FormLabel>Ilova yoki sayt uchun: Foydalanuvchi nomi</FormLabel>
	    					<FormControl>
	    						<Input placeholder="shadcn" {...field} disabled = {isLoading} />
	    					</FormControl>
	    					<FormMessage />
	    				</FormItem>
	    			)}
	    		/>
	    		<Button type="submit" disabled ={isLoading} > Tasdiqlash</Button>
	    	</form>
	    </Form>
		</>
)
	
}

export default TaskForm