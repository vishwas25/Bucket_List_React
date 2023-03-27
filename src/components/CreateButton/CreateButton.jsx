import React from 'react'
import './CreateButton.css'

const CreateButton = ({setBucket}) => {

    const [createBtn, setCreateBtn] = React.useState(false)
    const [bucketName, setBucketName] = React.useState('')
    const [errorMsg, setErrorMsg] = React.useState(false)

    const cancelCreateBucket = () => {
        setBucketName('')
        setCreateBtn(false)
    }

    const createBucket = (e) => {
        e.preventDefault()
        if(bucketName === '') {
            setErrorMsg(true)
            setTimeout(() => {
                setErrorMsg(false)
            }, 2000); 
        } else {
            setBucket(prev => {
                return [
                    ...prev,
                    {
                        name: bucketName,
                        id: new Date().getTime() + 9,
                        cards: []
                    }
                ]
            })
            setBucketName('')
            setCreateBtn(false)
        }
    }

    return (
        <div className='create-btn'>

            {
                createBtn 
                ?   <form onSubmit={createBucket} className="input-name-section">
                        <label htmlFor="bucket">Enter name for Bucket</label>
                        {
                            errorMsg && <span className='error-msg'>input fields cannot be empty</span>
                        }
                        <input 
                            type="text"
                            id='bucket'
                            autoComplete='off'
                            autoFocus
                            value={bucketName}
                            placeholder='Bucket name'
                            onChange={(e) => setBucketName(e.target.value)}
                        />
                        <div className="btn">
                            <button onClick={createBucket}>add</button>
                            <button onClick={cancelCreateBucket}>cancel</button>
                        </div>
                    </form>
                :   <button onClick={() => setCreateBtn(true)}>create bucket</button>
            }

        </div>
    )
}

export default CreateButton