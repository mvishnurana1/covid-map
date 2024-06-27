import linkUnlink from '../../../public/wired-globe.gif';
import './ErrorPage.scss';

function ErrorPage() {

    return <div className='error-page-container'>
              <img src={ linkUnlink } alt='film-gif' width={'200px'} />
              <h2 className='gl-header-level-two'>Something just went wrong...!</h2>
              <div style={{ fontSize:'20px' }}>Please refresh the browser</div>
          </div>
}

export default ErrorPage;
