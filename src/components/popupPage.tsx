import React, { useEffect, useState } from 'react'
import '../styles/tailwind.css'

const PopupPage = () => {
	const [imageUrls, setImageUrls] = useState([]);

  function downloadImages(imageUrl) {
			fetch(imageUrl)
				.then((response) => response.blob())
				.then((blob) => {
					const url = window.URL.createObjectURL(new Blob([blob]))
					const link = document.createElement('a')
					link.href = url
					link.setAttribute('download', `image.jpg`)
					document.body.appendChild(link)
					link.click()
					link.parentNode.removeChild(link)
				})
				.catch((error) => {
					console.error(`Error downloading image ${imageUrl}:`, error)
				})
	}

	useEffect(() => {
		chrome.storage.local.get(['images']).then(({images}) => {
			setImageUrls(images as string[])
		})
	}, [])

	
	return (
		<div className="w-52 h-52">
			<button className='btn'> hello</button>
			{imageUrls?.map((image) => (
				<div key={image} className="border border-indigo-600 flex justify-evenly mb-3 bg-white">
					<div className=" w-20">
						<img src={image} alt="hello" />
					</div>
					<button
						className=" bg-slate-500 h-6"
						onClick={() => downloadImages(image)}
					>
						download
					</button>
				</div>
			))}
		</div>
	)
}

export default PopupPage
