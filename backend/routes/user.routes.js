import express from "express";
import multer from "multer";
import userController from "./../controller/user.controller.js";
import tokenVerify from "./../middleware/middleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({
  storage,
});
router.post(
  "/update-profile",
  tokenVerify,
  upload.single("profile"),
  userController.uploadProfile,
);

router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);
router.route("/me").get(tokenVerify, userController.me);
router.route("/logout").post(tokenVerify, userController.logout);
router.route("/user_update").post(tokenVerify, userController.userUpdate);
router
  .route("/get_user_and_profile")
  .get(tokenVerify, userController.getUserProfile);

router.route("/user/:userId/profile").get(userController.getOtherUserProfile);

router
  .route("/update_profile_data")
  .post(tokenVerify, userController.updateProfileData);

router
  .route("/edit_profile_data")
  .patch(tokenVerify, userController.editProfileData);

router.route("/get_all_users").get(tokenVerify, userController.getAllUsers);
router
  .route("/user/download_resume")
  .get(tokenVerify, userController.downloadProfile);

router
  .route("/user/send_connection_request/:receiverId")
  .post(tokenVerify, userController.sendConnectionRequest);
router
  .route("/user/response_to_pending_request/:requestId")
  .post(tokenVerify, userController.respondToRequest);
router
  .route("/user/see_all_request")
  .get(tokenVerify, userController.pendingRequests);
router
  .route("/user/see_all_connections")
  .get(tokenVerify, userController.getAllConnections);

router.route("/user/find-user").get(tokenVerify, userController.searchUser);

export default router;
