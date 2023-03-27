import React from 'react'
import './Bucket.css'
import {TbDots} from 'react-icons/tb' 
import Card from '../Card/Card'
import CardModal from '../CardModal/CardModal'


const Bucket = ({item, setBucket, buckets, handleDragEnter, handleDragEnd,}) => {
    // to toggle modal
    const [showModal, setShowModal] = React.useState(false)

    const [toggleDelete, setToggleDelete] = React.useState(false)    

	// function to create new card
	const createCard = (data, bId) => {
		let tempBucket = [...buckets]
		const bIndex = tempBucket.findIndex(item => item?.id === bId)
        if (bIndex < 0) {
            return
        }
		tempBucket[bIndex]?.cards.push(data)
		setBucket(tempBucket);
	}


    // delete single card
    const deleteCard = (bucketId, cardId) => {
        const bucketIndex = buckets.findIndex(item => item.id === bucketId)
        if (bucketIndex < 0) {
            return
        }
        const cardIndex = buckets[bucketIndex].cards.findIndex(item => item.id === cardId)
        if (cardIndex < 0) {
            return
        }

        const tempBucket = [...buckets]
        tempBucket[bucketIndex].cards.splice(cardIndex, 1)
        setBucket(tempBucket)
    }

    // delete all card in one bucket
    const deleteAllCards = (bucketId) => {
        const bucketIndex = buckets.findIndex(item => item.id === bucketId)
        if (bucketIndex < 0) {
            return
        }

        const tempBucket = [...buckets]
        tempBucket[bucketIndex].cards.splice(0, item?.cards?.length)
        setBucket(tempBucket)
        setToggleDelete(false)
    }


    return (
        <div className='bucket-container'>
            <div className="top" style={{position:'relative'}}>
                <span>{item?.name}</span>
                <TbDots style={{cursor:'pointer'}} onClick={() => setToggleDelete(prev => !prev)}/>
                {
                    toggleDelete 
                    &&
                    <span onClick={() => deleteAllCards(item?.id)} className='toggle-icon'>Delete all cards</span>
                }
            </div>
            
            {/* cards components */}
            <div className="mid" >
                {
                    item?.cards?.map(card => <Card 
                        key={card?.id} 
                        card={card} 
                        deleteCard={deleteCard} 
                        bucketId={item?.id}
                        handleDragEnd={handleDragEnd}
                        handleDragEnter={handleDragEnter}
                        buckets={buckets}
                        setBucket={setBucket}
                    />)
                }
            </div>
            
            {/* create cards button */}
            <div className="bottom">
                <button onClick={() => setShowModal(true)}>add card</button>
            </div>
            {	
                showModal 
				&&
            	<CardModal 
					setShowModal={setShowModal}
					createCard={createCard}
					bucketId={item?.id}
				/>
            }
        </div>
    )
}

export default Bucket
