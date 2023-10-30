import React from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
const ClipBoard: React.FC<{ text: string}> = ({
  text,
}) => {
  const handleCopy = () => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  return <IconButton aria-describedby="clipBoard" aria-label="clipBoard" title="" onClick={handleCopy} className="cursor-pointer flex items-center pl-0"><ContentCopyIcon /></IconButton>;
};

export default ClipBoard;
