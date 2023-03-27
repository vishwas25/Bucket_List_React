import React from 'react'
import { Link } from 'react-router-dom'

const History = () => {

    const [historyList, setHistoryList] = React.useState(JSON.parse(localStorage.getItem('history')) || [] )

    return (
        <div className='history'>
            <div className="top">
                <h1>History page</h1>
                <Link to='/'>Go back to homepage</Link>
            </div>
            <div className="history-main-container">
                {
                    historyList?.reverse()?.map((item, index) => {
                        return (
                            <div key={index} className='single-log'>
                                <p>Title: {item?.title}</p>
                                <p>Link : {item?.link}</p>
                                <p>Last played on: {item?.time?.slice(0,25)}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default History