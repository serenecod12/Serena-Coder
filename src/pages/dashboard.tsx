import TaskItem from '@/components/shared/task-item'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import TaskForm from '@/constants/forms/task-form'
import { BadgePlus } from 'lucide-react'

import FillLoading from '@/components/shared/fill-loading'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { db } from '@/firebase'
import { formSchema } from '@/lib/validation'
import { TaskService } from '@/servike/task-servike'
import { useUserState } from '@/stores/user.store'
import { useQuery } from '@tanstack/react-query'
import { addDoc, collection, } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { z } from 'zod'

const CurrentTimeCard = ({ title, gradient }: { title: string, gradient: string }) => {
	const [currentTime, setCurrentTime] = useState(new Date())

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(new Date())
		}, 1000) // 1 sekundda bir yangilanadi

		return () => clearInterval(interval)
	}, [])

	const formatTime = (date: Date) => {
		const hours = String(date.getHours()).padStart(2, '0')
		const minutes = String(date.getMinutes()).padStart(2, '0')
		const seconds = String(date.getSeconds()).padStart(2, '0')
		return `${hours}:${minutes}:${seconds}`
	}

	return (
		<div className={`p-4 rounded-md bg-gradient-to-r ${gradient} relative h-24`}>
			<div className='text-2xl font-bold'>{title}</div>
			<div className='text-3xl font-bold'>{formatTime(currentTime)}</div>
		</div>
	)
}

const Dashboard = () => {

	const { user } = useUserState()
	const [open, setOpen] = useState(false)

	const { isPending, data, refetch } = useQuery({
		queryKey: ['tasks-data'],
		queryFn: TaskService.getTask
	})

	const onAdd = async ({ title }: z.infer<typeof formSchema>) => {
		if (!user) return null

		return addDoc(collection(db, "tasks"), {
			title,
			status: 'unstated',
			startTime: null,
			endTime: null,
			userID: user.uid
		}).then(() => refetch())
			.finally(() => setOpen(false))
	}

	return (
		<div className='h-screen max-w-6xl mx-auto flex items-center'>
			<div className='grid grid-cols-2 w-full gap-8 items-center'>
				<div className='flex flex-col space-y-3'>
					<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-t from-background to-secondary'>
						<div className='text-2xl font-bold'><h6>Bajarilgan vazifalarizni qo`shing💻</h6></div>
						<Dialog open={open} onOpenChange={setOpen}>
							<DialogTrigger>
								<Button size={'icon'} onClick={() => setOpen(true)}>
									<BadgePlus />
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Yangi vazifa qo‘shish</DialogTitle>
								</DialogHeader>
								<TaskForm handler={onAdd} />
							</DialogContent>
						</Dialog>
					</div>
					<Separator />
					<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-b from-background to-secondary relative min-h-60'>
						{isPending && <FillLoading />}
						<div className='flex flex-col space-y-3 w-full'>

							{data?.tasks?.length
								? (data.tasks.map(task => (<TaskItem key={task.id} task={task} />)))
								: (<div>Hech qanday vazifa topilmadi!</div>)}

						</div>
					</div>
				</div>

				<div className='flex flex-col space-y-3 relative w-full'>
					<CurrentTimeCard title="Total week" gradient="from-blue-900 to-background" />
					<CurrentTimeCard title="Total week" gradient="from-secondary to-background" />
					<CurrentTimeCard title="Total week" gradient="from-destructive to-background" />
				</div>
			</div>
		</div>
	)
}

export default Dashboard
