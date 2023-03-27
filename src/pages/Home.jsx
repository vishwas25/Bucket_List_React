import React from 'react'
import { Link } from 'react-router-dom'
import Bucket from '../components/Bucket/Bucket'
import CreateButton from '../components/CreateButton/CreateButton'

const Home = () => {

    // main state that will track the bucket that are created
    const [buckets, setBucket] = React.useState([])

    // drag functionality
    const [targetCard, setTargetCard] = React.useState({
        cardId: '',
        bucketId: ''
    })

    const handleDragEnd = (cardId, bucketId) => {
        let sourceBucketIndex, sourceCardIndex, targetBucketIndex, targetCardIndex

        // checking inside bucket
        sourceBucketIndex = buckets.findIndex(item => item.id === bucketId)
        if (sourceBucketIndex < 0) {
            return
        }

        // using bucketIndex to go inside particular bucket and then check for card index
        sourceCardIndex = buckets[sourceBucketIndex].cards.findIndex(item => item.id === cardId)
        if (sourceCardIndex < 0) {
            return
        }

        // similar for target, checking inside bucket
        targetBucketIndex = buckets.findIndex(item => item.id === targetCard.bucketId)
        if (targetBucketIndex < 0) {
            return
        }

        // using bucketIndex to go inside particular bucket and then check for card index
        targetCardIndex = buckets[targetBucketIndex].cards.findIndex(item => item.id === targetCard.cardId)
        if (targetCardIndex < 0) {
            return
        }

        // copy all bucket
        const tempBucket = [...buckets]
        // navigate through the bucket for the card and create its copy before deleting it
        const tempCard = tempBucket[sourceBucketIndex].cards[sourceCardIndex]
        // copy created than using slpice function to delete the card
        tempBucket[sourceBucketIndex].cards.splice(sourceCardIndex, 1)
        // using target bucket index and card index we can insert the copy at that posiiton
        tempBucket[targetBucketIndex].cards.splice(targetCardIndex, 0, tempCard)
        setBucket(tempBucket)
    }

    const handleDragEnter = (cardId, bucketId) => {
        setTargetCard({
            cardId,
            bucketId
        })
    }

    return (
        <div className="main-outer-container">
            <div className="top">
                <h1>Create your own video playlist</h1>
                <Link to='/history'>History</Link>
            </div>

                <div className="main-inner-container">
                    {
                        buckets?.map(item => <Bucket 
                            key={item.id} 
                            item={item} 
                            setBucket={setBucket} 
                            buckets={buckets} 
                            handleDragEnd={handleDragEnd}
                            handleDragEnter={handleDragEnter}
                        />)
                    }
                    <CreateButton 
                        setBucket={setBucket}
                    />
                </div>
        </div>
    )
}

export default Home