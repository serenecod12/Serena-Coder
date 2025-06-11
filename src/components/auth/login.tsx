import { auth } from '@/firebase'
import { loginSchema } from '@/lib/validation'
import { useAuthState } from '@/stores/auth.store'
import { useUserState } from '@/stores/user.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithEmailAndPassword } from 'firebase/auth'
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

const Login = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const { setUser } = useUserState()
	const { setAuth } = useAuthState()
	const navigate = useNavigate()

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', passowrd: '' },
	})

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		const { email, passowrd } = values
		setIsLoading(true)
		try {
			const res = await signInWithEmailAndPassword(auth, email, passowrd)
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
			<h2 className='text-xl font-bold'>Tizimga kirish</h2>
			<p className='text-muted-foreground'>
				Akkauntingiz yo‘qmi?{' '}
				<span
					className='text-blue-500 cursor-pointer hover:underline'
					onClick={() => setAuth('register')}
				>
					Ro‘yxatdan o‘tish
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
								<FormLabel>Email manzilingiz</FormLabel>
								<FormControl>
									<Input
										placeholder='misol@gmail.com'
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

export default Login
