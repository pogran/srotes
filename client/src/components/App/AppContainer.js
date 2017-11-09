import {connect} from 'react-redux';
import App from "./App";
import {loadStores} from "../../actions/actions";

const mapDispatchToProps = dispatch => {
  return {
      loadStores: () => dispatch(loadStores())
  }
}

export default connect(
    null,
    mapDispatchToProps
)(App);