import React from 'react'
import './CardModal.css'
import {MdClose} from 'react-icons/md'

const CardModal = ({setShowModal, createCard, bucketId}) => {

	const [cardInfo, setCardInfo] = React.useState({
		title:'',
		link:''
	})

	const [errorMsg, setErrorMsg] = React.useState(false)

	const handleCardInfoSubmit = (e) => {
		e.preventDefault()
		if(cardInfo?.title !== '' && cardInfo?.link !== '') {
			const newCardInfo = {title: cardInfo?.title, link: cardInfo?.link, id: new Date().getTime()}
			createCard(newCardInfo, bucketId)
			setCardInfo({title:'', link:''})
			setShowModal(false)
		} else {
			setErrorMsg(true)
            setTimeout(() => {
                setErrorMsg(false)
            }, 2000); 
		}
	}

    return (
		<div className="card-modal-outer">
			<div className='card-modal-inner'>
				<form onSubmit={handleCardInfoSubmit}>
					<label htmlFor="cardTitle">title</label>
					<input 
						type="text" 
						id="cardTitle"
						autoFocus
						autoComplete='off'
						defaultValue={cardInfo?.title}
						placeholder='Title'
						onChange={(e) => setCardInfo(prev => {
							return {...prev, title: e.target.value}
						})}
						/>
					<label htmlFor="link">link</label>
					<input 
						type="text"
						id='link'
						autoComplete='off'
						defaultValue={cardInfo?.link}
						placeholder='Link'
						onChange={(e) => setCardInfo(prev => {
							return {...prev, link: e.target.value}
						})}
						/>
				</form>
					{
						errorMsg && <span className='error-msg'>input fields cannot be empty</span>
					}
					<button onClick={handleCardInfoSubmit}>add</button>
					<MdClose onClick={() => setShowModal(false)}/>
			</div>
		</div>
    )
}

export default CardModal