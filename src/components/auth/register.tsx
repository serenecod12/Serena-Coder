import { auth } from '@/firebase' 
import { registerSchema } from '@/lib/validation' 
import { useAuthState } from '@/stores/auth.store'
import { useUserState } from '@/stores/user.store' 
import { zodResolver } from '@hookform/resolvers/zod' 
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react' 
import { useForm } from 'react-hook-form' 
import { RiAlertLine } from 'react-icons/ri' 
import { useNavigate } from 'react-router-dom' 
import { z } from 'zod'
import FillLoading from '../shared/fill-loading' 
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Button } from '../ui/button' 
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form' 
import { Input } from '../ui/input'
import { Separator } from '../ui/separator' 

const Register = () => {
	const [isLoading, setIsLoading] = useState(false) 
	const [error, setError] = useState('') 

	const { setAuth } = useAuthState()
	const navigate = useNavigate()
	const { setUser } = useUserState()

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: { email: '', passowrd: '', confirmPassword: '' },
	})

	const onSubmit = async (values: z.infer<typeof registerSchema>) => {
		const { email, passowrd } = values
		setIsLoading(true)
		try {
			const res = await createUserWithEmailAndPassword(auth, email, passowrd)
			setUser(res.user) 
			navigate('/') 
		} catch (error) {
			const result = error as Error
			setError(result.message) 
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='flex flex-col'>
			{isLoading && <FillLoading />} 

			<h2 className='text-xl font-bold'>Ro‘yxatdan o‘tish</h2>
			<p className='text-muted-foreground'>
				Allaqachon akkauntingiz bormi?{' '}
				<span
					className='text-blue-500 cursor-pointer hover:underline'
					onClick={() => setAuth('login')}
				>
					Kirish
				</span>
			</p>

			<Separator className='my-3' />

			{error && (
				<Alert variant='destructive'>
					<RiAlertLine className='h-4 w-4' />
					<AlertTitle>Xatolik</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

		
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
					
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email manzil</FormLabel>
								<FormControl>
									<Input
										placeholder='example@gmail.com'
										disabled={isLoading}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='grid grid-cols-2 gap-2'>
						<FormField
							control={form.control}
							name='passowrd'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Parol</FormLabel>
									<FormControl>
										<Input
											placeholder='*****'
											type='password'
											disabled={isLoading}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Parolni tasdiqlang</FormLabel>
									<FormControl>
										<Input
											placeholder='*****'
											type='password'
											disabled={isLoading}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div>
						<Button
							type='submit'
							className='h-12 w-full mt-2'
							disabled={isLoading}
						>
							Yuborish
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default Register
