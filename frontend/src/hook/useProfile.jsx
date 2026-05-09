import { useState } from "react";

function useProfile() {
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const openProfile = (userId) => {
    setSelectedUserId(userId);
    setOpen(true);
  };

  const closeProfile = () => {
    setOpen(false);
    setSelectedUserId(null);
  };
  return {
    open,
    selectedUserId,
    openProfile,
    closeProfile,
  };
}

export default useProfile;
