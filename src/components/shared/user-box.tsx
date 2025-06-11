import { auth } from '@/firebase'
import { useUserState } from '@/stores/user.store'
import { LogOut } from 'lucide-react'
import { CgGym } from 'react-icons/cg'
import { LuLoader2 } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const UserBox = () => {
	const { user, setUser } = useUserState()

	const navigate = useNavigate()

	// Agar foydalanuvchi ma'lumotlari yo'q bo'lsa, yuklanish animatsiyasini ko'rsatamiz
	if (!user) return <LuLoader2 className='animate-spin' />

	// Chiqish funksiyasi — foydalanuvchi tizimdan chiqadi va auth sahifasiga yo'naltiriladi
	const onLogout = () => {
		auth.signOut().then(() => {
			setUser(null)
			navigate('/auth')
		})
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				{/* Foydalanuvchi avatarini ko'rsatamiz, bosilganda menyu ochiladi */}
				<Avatar className='cursor-pointer'>
					<AvatarImage src={user.photoURL!} />
					<AvatarFallback className='uppercase'>
						{user.email![0]}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>

			{/* Pastga ochiladigan menyu */}
			<DropdownMenuContent
				className='w-80'
				align='start'
				alignOffset={11}
				forceMount
			>
				{/* Foydalanuvchi haqida qisqacha ma'lumot */}
				<div className='flex flex-col space-y-4 p-2'>
					<p className='text-xs font-medium leading-none text-muted-foreground'>
						{user.email}
					</p>

					<div className='flex items-center gap-x-2'>
						<div className='rounded-md bg-secondary/50 p-1'>
							<Avatar>
								<AvatarImage src={user.photoURL!} />
								<AvatarFallback className='uppercase'>
									{user.email![0]}
								</AvatarFallback>
							</Avatar>
						</div>

						<div className='space-y-1'>
							<p className='line-clamp-1 text-sm'>
								{user.displayName ?? user.email}
							</p>
						</div>
					</div>
				</div>

				<DropdownMenuSeparator />

				{/* Menyudagi elementlar */}
				<DropdownMenuGroup>
					<DropdownMenuItem className='cursor-pointer' onClick={onLogout}>
						<CgGym className='w-4 h-4 mr-2' />
						<span>Dasturlash xonasi</span>
					</DropdownMenuItem>
					<DropdownMenuItem
						className='cursor-pointer bg-destructive'
						onClick={onLogout}
					>
						<LogOut className='w-4 h-4 mr-2' />
						<span>Chiqish</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserBox
