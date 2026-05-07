import { useState } from "react";
import "./ShareModel.css";

function ShareModel({ isOpen, onClose, postUrl, postTitle }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyLink = async () => {
    await navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // const nativeShare = async () => {
  //   if (navigator.share) {
  //     await navigator.share({
  //       title: postTitle,
  //       url: postUrl,
  //     });
  //   } else {
  //     alert("Not supported!");
  //   }
  // };
  return (
    <div className="overlay" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <h3>Share this post</h3>

        {/* Copy Link */}
        <div className="copy-section">
          <input type="text" value={postUrl} readOnly />
          <button onClick={copyLink}>{copied ? "✅ Copied!" : "Copy"}</button>
        </div>

        <button className="close-btn" onClick={onClose}>
          ✕ Close
        </button>
      </div>
    </div>
  );
}

export default ShareModel;
