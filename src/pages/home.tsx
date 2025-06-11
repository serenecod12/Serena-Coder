import men from '@/assets/men.png'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { featuredItems } from '@/constants'
import { auth } from '@/firebase'
import { useUserState } from '@/stores/user.store'
import { LogOut } from 'lucide-react'
import { CgGym } from 'react-icons/cg'
import { FaArrowRightLong } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'

const programs = [
  { title: 'HTML Darslari', descr: 'Boshlang‘ich HTML darslari', path: '/courses/html' },
  { title: 'CSS Darslari', descr: 'Boshlang‘ich CSS darslari', path: '/courses/css' },
  { title: 'JavaScript Darslari', descr: 'Boshlang‘ich JS darslari', path: '/courses/javascript' }
]

const Home = () => {
  const { user, setUser } = useUserState()
  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut().then(() => {
      setUser(null)
      navigate('/auth')
    })
  }

  return (
    <>
      <section className='w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-12 gap-12 transition-all duration-500 ease-in-out'>

      <div className='flex flex-col justify-center text-center md:text-left max-w-xl transition-all duration-500 ease-in-out'>
      <h1 className='font-semibold uppercase leading-tight text-foreground'
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
            }}
          >
            Meni saytim bilan bilim oling
          </h1>
          <p
            className='text-muted-foreground mt-4 transition-all duration-500 ease-in-out'
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', 
              maxWidth: '600px',
            }}
          >
            Dasturlash HTML, CSS, JS, REACT, NODE.JS, PYTHON darslari kurslari va video orqali yaxshi bilim olishiz uchun yordam beramiz.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 mt-8'>
            {user ? (
              <>
                <Link to={'/dashboard'}>
                  <Button className='w-full sm:w-fit font-bold h-12 transition-transform duration-300 ease-in-out hover:scale-105' size={'lg'}>
                    <span>Darsga o'tish</span>
                    <CgGym className='h-5 w-5 ml-2' />
                  </Button>
                </Link>
                <Button
                  className='w-full sm:w-fit font-bold h-12 transition-transform duration-300 ease-in-out hover:scale-105'
                  variant={'destructive'}
                  size={'lg'}
                  onClick={onLogout}
                >
                  <span>Chiqish</span>
                  <LogOut className='h-5 w-5 ml-2' />
                </Button>
              </>
            ) : (
              <Link to={'/auth'}>
                <Button className='w-full sm:w-fit font-bold h-12 transition-transform duration-300 ease-in-out hover:scale-105' size={'lg'}>
                  Hozir qo‘shiling
                </Button>
              </Link>
            )}
          </div>

          <div className='mt-12'>
            <p className='text-muted-foreground text-sm mb-2'>BIZNI QULAY KO‘RGANLAR</p>
            <div className='flex items-center justify-center md:justify-start gap-4'>
              {featuredItems.map((Icon, index) => (
                <Icon key={index} className='w-10 h-10 text-primary transition-transform duration-300 ease-in-out hover:scale-110' />
              ))}
            </div>
          </div>
        </div>

        <div className='flex justify-center md:justify-end'>
				<img
 					src={men}
 				 	alt='men'
  				onClick={() => window.open('https://www.youtube.com/@SereneCoder-l2b', '_blank')} 
  				className='cursor-pointer w-[clamp(200px,30vw,400px)] object-contain transition-transform duration-500 ease-in-out hover:scale-105 rounded-xl shadow-lg'
				/>
       </div>
      </section>
      <section className='container max-w-6xl mx-auto px-6 py-12'>
        <h2
          className='text-foreground font-bold leading-tight text-center md:text-left'
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          }}
        >
          Qayerdan boshlashni bilmayapsizmi?
        </h2>
        <p
          className='mt-2 text-muted-foreground text-center md:text-left'
          style={{
            fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
          }}
        >
          Dasturlash sizga interaktiv videolar orqali kunlik yo‘riqnoma berib, maqsadingizga yetishga yordam beradi.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10'>
          {programs.map(item => (
            <Card
              key={item.title}
              className='p-6 relative cursor-pointer group transition-transform duration-300 ease-in-out hover:scale-105'
              onClick={() => navigate(item.path)}
            >
              <h3 className='font-semibold text-lg text-foreground'>{item.title}</h3>
              <p className='text-sm text-muted-foreground mt-2'>{item.descr}</p>
              <Button
                size={'icon'}
                variant={'ghost'}
                className='absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 ease-in-out'
              >
                <FaArrowRightLong />
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
