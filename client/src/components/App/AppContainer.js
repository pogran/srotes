import {connect} from 'react-redux';
import App from "./App";
import {loadStores} from "../../actions/actions";

const mapStateToProps = state => {
    return {
        loading: state.store.loading,
    };
}

const mapDispatchToProps = dispatch => {
  return {
      loadStores: () => dispatch(loadStores())
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);