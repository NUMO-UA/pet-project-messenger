import { useDispatch} from "react-redux";
import { addReceiver } from "store/conversation/conversation-actions";
import "./chatheads.css";

export default function ChatHeads({items, onHandleSearch}) {

  

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    onHandleSearch(e.target.value)
  }

  const handleReceiver = (obj) => {
    dispatch(addReceiver(obj))
  }

  return (
    <div>
      <div className="conv-header-container">
        <p className="conversations-header">Conversations</p>
        <div>
        </div>
      </div>
      <input
        className="chat-heads-search"
        placeholder="Search in Messenger"
        autoFocus
        autoComplete="off"
        type='search'
        onChange={handleSearch}
        />
        <div className="chat-heads-container">
        {items.map((obj, i) => (
          <div
            key={i}
            className="chat-head-item"
            onClick={() => handleReceiver(obj)}
          >
            <div className="user-profile-pic-container">
              <p className="user-profile-pic-text">{obj.email[0]}</p>
            </div>
            <p>{obj.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
