import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import {loadComments} from '../../../actions/actions';

class CommentContainer extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <div>Список комментариев</div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        loadComments: () => dispatch(loadComments())
    }
}

export default connect(null, null)(CommentContainer);
