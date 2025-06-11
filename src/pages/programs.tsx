const Programs = () => {
	// Har bir video fayl haqida ma'lumotlar ro'yxati
	const videos = [
		{ id: 1, title: "HTML/KIRISH", file: "video.mp4.", description: "HTML-GA kirish video darslik." },
		{ id: 2, title: "HTML HAQIDA", file: "video.mp4.", description: "HTML haqida qisqa video darslik." },
		{ id: 3, title: "CSS ASOSLARI", file: "video.mp4.", description: "CSS haqida malumotlar video rolik." },
		{ id: 4, title: "HTML & CSS", file: "video.mp4.", description: "HTML va CSS bo‘yicha amaliy dars1." },
		{ id: 5, title: "AMALIY", file: "video.mp4.", description: "HTML va CSS bo‘yicha amaliy dars2." },
		{ id: 6, title: "AMALIY DARSLAR", file: "video.mp4.", description: "HTML va CSS bo‘yicha amaliy dars3." },
	]

	return (
		<div className='min-h-screen flex items-start justify-center pt-20 px-4'>
			<div className='container max-w-6xl'>
				<h1 className='text-4xl font-bold mb-6 text-center text-red-600'>Dasturlar sahifasi</h1>
				<p className='mb-8 text-center text-lg text-gray-400'>
					Bu yerda siz turli xil video darslarni yuklab olishingiz mumkin.
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
					{videos.map((video) => (
						<div
							key={video.id}
							className='p-6 border rounded-xl shadow hover:shadow-lg transition-shadow'
						>
							<h2 className='text-xl font-semibold mb-2'>{video.title}</h2>
							<p className='text-gray-600 mb-3'>{video.description}</p>
							<a
								href={`/downloads/${video.file}`}
								download
								className='text-blue-500 hover:text-blue-800 hover:underline mt-2 inline-block'
							>
								yuklab olish
							</a>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Programs


