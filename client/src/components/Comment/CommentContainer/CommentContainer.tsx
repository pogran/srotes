import * as React from 'react';
import {connect} from 'react-redux';

class CommentContainer extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <div>test</div>
        );
    }
}


const mapDispatchToProps = (dispatch: any) => {
    return {
        //loadComment: () => dispatch()
    }
}

export default connect(null, null)(CommentContainer);
