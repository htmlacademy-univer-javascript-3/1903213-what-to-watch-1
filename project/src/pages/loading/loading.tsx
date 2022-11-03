import Spinner from '../../components/spinner/spinner';
import './loading.css';

function Loading(): JSX.Element {
  return (
    <div className='loading-page'>
      <Spinner />
    </div>
  );
}

export default Loading;
