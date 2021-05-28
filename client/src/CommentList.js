import React from 'react'

const CommentList = (props) => {
   
    const renderedComments = props.comments.map((comment) => {
        const moderationContent = {
            pending: 'Waiting approval',
            rejected: 'The comment was rejected',
            approved: comment.content
        }
        
        return <li key={comment.id}>{ moderationContent[comment.status] }</li>
    })

    return <ul>
        {renderedComments}
    </ul>
}

export default CommentList