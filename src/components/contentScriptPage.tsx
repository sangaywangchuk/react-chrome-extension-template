import React, { useEffect, useState } from 'react'
import '../styles/tailwind.css'

const ContentPage = () => {
	const [images, setImages] = useState([])

	const sendImages = () => {
		try {
			Array.from(document.querySelectorAll('img')).forEach((element) => {
				if (element.src.includes('https')) {
					setImages((results) => {
						const images = [...results, element.src]
						return images
					})
				}
			})
		} catch (error) {
			console.error('Error occurred:', error)
		}
	}

	useEffect(() => {
		if (images.length) {
			chrome.storage.local.set({ images }).then(() => {
				console.log('Value is set')
			})
		} else {
			console.log('No images found.')
		}
	}, [images])

	useEffect(() => {
		sendImages()
	}, [])

	return (
		<div className="text-5xl bg-green-500 ">
			this this content page
		</div>
	)
}

export default ContentPage
