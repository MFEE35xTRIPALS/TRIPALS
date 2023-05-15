import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Likepost() {
  return (
    <div>
      <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }}/>
    </div>
  );
}export default Likepost;