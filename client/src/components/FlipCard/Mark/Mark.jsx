const { BookmarkAddedRounded, BookmarkBorderRounded } = require("@mui/icons-material");
const { Tooltip, IconButton } = require("@mui/material");

const Mark = ({isMarked, handleBookmark}) => (
  <Tooltip
      title={isMarked?"Unmark":"Mark"}
  >
      <IconButton
          style={{color: `${isMarked?'#00ffff':'#f6f7fb'}`}}
          size="12px"
          onClick={handleBookmark}
      >
          {isMarked?(<BookmarkAddedRounded/>):(<BookmarkBorderRounded/>)}
      </IconButton>
  </Tooltip>
)

export default Mark