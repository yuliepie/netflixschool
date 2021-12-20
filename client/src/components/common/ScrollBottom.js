
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToBottom({ history }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 100);
    });
    return () => {
      unlisten();
    }
  }, [history]);

  return (null);
}

export default withRouter(ScrollToBottom);