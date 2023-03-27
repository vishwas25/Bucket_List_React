import React from 'react'
import IframeModal from '../IframeModal/IframeModal'
import {MdOutlineDelete, MdModeEditOutline} from 'react-icons/md'
import './Card.css'


const Card = ({bucketId, card, deleteCard, handleDragEnter, handleDragEnd, setBucket, buckets}) => {

    const [showIframe, setShowIframe] = React.useState(false)

    const [editCard, setEditCard] = React.useState(false)

    const [newUpdatedValue, setUpdatedValue] = React.useState({
        title: '', link:''
    })

    // storing in local storage for history log
    const handleVideoPlay = () => {
        const newLog = {...card, time: new Date().toString().slice(0, 25) }
        const logItems = JSON.parse(localStorage.getItem('history'))
        if (logItems === null) {
            localStorage.setItem('history', JSON.stringify([newLog]))
            setShowIframe(true)
        } else {
            localStorage.setItem('history', JSON.stringify([...logItems, newLog]))
            setShowIframe(true)
        }
    }

    // updating the cards value
    const handleCardInfoUpdate = (bucketId ,cardId) => {
        const bucketIndex = buckets.findIndex(item => item.id === bucketId)
        if (bucketIndex < 0) {
            return
        }
        const cardIndex = buckets[bucketIndex].cards.findIndex(item => item.id === cardId)
        if (cardIndex < 0) {
            return
        }

        const newCardValue = {title: newUpdatedValue?.title, link: newUpdatedValue?.link, id: card?.id}

        const tempBucket = [...buckets]
        tempBucket[bucketIndex].cards.splice(cardIndex, 1, newCardValue)
        setBucket(tempBucket)
        setEditCard(false)
    }

    if(!editCard) {   
        return (
            <div id={card?.id} className='card'
                draggable
                onDragEnter={() => handleDragEnter(card?.id, bucketId)}
                onDragEnd={() => handleDragEnd(card?.id, bucketId)}
                >
                <div className="top">
                    <span>{card?.title}</span>
                    <MdModeEditOutline 
                        onClick={() => setEditCard(true)}
                        />
                    <MdOutlineDelete
                        onClick={() => deleteCard(bucketId, card?.id)}
                        />
                </div>
                <div className="bottom">
                    <span onClick={handleVideoPlay}>Link: {card?.link}</span>
                </div>
                {
                    showIframe && <IframeModal link={card?.link} setShowIframe={setShowIframe}/>
                }
            </div>
        )
    } else {
        return (
            <div id={card?.id} className='card'>
                <div className="top">
                    <input 
                        type="text" 
                        defaultValue={card?.title} 
                        onChange={(e) => setUpdatedValue(prev => {
                            return {...prev, title: e.target.value}
                        })}
                    />
                </div>
                <div className="bottom">
                    <input 
                        type="text" 
                        defaultValue={card?.link} 
                        onChange={(e) => setUpdatedValue(prev => {
                            return {...prev, link: e.target.value}
                        })}
                    />
                </div>
                <div className="card-btn">
                    <button onClick={() => handleCardInfoUpdate(bucketId, card?.id)}>update</button>
                    <button onClick={() => setEditCard(false)} >cancel</button>
                </div>
            </div>
        )
    }
}

export default Card