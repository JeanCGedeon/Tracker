import React, {useEffect} from "react";
const CommentHabitTile = ({
    id,
    deleteComment,
    errors,
 
  }) => {

     const buttons = (
    <div>
      <input
        className="button"
        type="button"
        id="delete"
        value="Delete Comment"
        onClick={() => {
          deleteComment(id);
        }}
      />
    </div>
  );
  
    return( <div className="reef">{buttons}</div>
    );
  };
  export default CommentHabitTile;
  