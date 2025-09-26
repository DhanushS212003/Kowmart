import React, { useContext, useEffect, useState } from "react";
import avatar from "../assets/img/other/profile_logo.png";
import "./profile.css";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context.jsx";
import {
  Alert,
  CancelButton,
  PrimaryButton,
  SecondaryButton,
} from "../styles.jsx";
import { Form, FormFeedback, Input, Label } from "reactstrap";
import Select from "react-select";
import { ConfirmationModal } from "../common";

const Profile = () => {
  const {
    currentUser,
    setCurrentUser,
    activeUser,
    usersList,
    setUsersList,
    repsList,
    setRepsList,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    address: "",
    district: "",
    pincode: "",
  });
  const [enableForm, setEnableForm] = useState(false);
  const [openAccountDeletionModal, setOpenAccountDeletionModal] =
    useState(false);
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    message: "",
    color: "",
  });

  const toggleAccountDeletionModal = () =>
    setOpenAccountDeletionModal(!openAccountDeletionModal);

  useEffect(() => {
    if (!currentUser) {
      setAlertInfo({
        show: true,
        message: "Unauthorized access. Redirecting to login page...",
        color: "danger",
      });
      setTimeout(() => navigate("/login?user=customer"), 1500);
    } else setFormValues();
  }, []);

  const setFormValues = () => {
    setUserInfo({
      name: activeUser.name,
      phone: activeUser.phone,
      address: activeUser.address,
      district: activeUser.district,
      pincode: activeUser.pincode,
    });
  };

  const updateUserInfo = (value, key) => {
    setUserInfo({
      ...userInfo,
      [key]: value,
    });
  };

  const saveForm = () => {
    const isCustomer = currentUser.type === "customer";
    const list = isCustomer ? usersList : repsList;
    const setList = isCustomer ? setUsersList : setRepsList;

    const updatedList = list.map((user) =>
      user.phone === activeUser.phone
        ? {
            ...user,
            ...userInfo,
            name: userInfo.name.trim(),
            address: userInfo.address.trim(),
          }
        : user
    );

    setList(updatedList);
    setEnableForm(false);
  };

  const logOut = () => {
    setCurrentUser(null);
    navigate("/");
  };

  const deleteUser = () => {
    const activeUserId = currentUser.id;
    setAlertInfo({
      show: true,
      message: "Deleting the Account...",
      color: "success",
    });
    setTimeout(() => {
      logOut();
      setUsersList((users) =>
        users.filter((user) => user.phone != activeUserId)
      );
    }, 1500);
  };

  const enableSaveForm =
    userInfo.name.trim().length > 2 &&
    userInfo.address.trim().length > 5 &&
    userInfo.pincode.length === 6;

  const districts = [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kanchipuram",
    "Kanniyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Puducherry",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
  ].map((e) => ({ value: e, label: e }));

  return (
    <main className="d-flex justify-content-center align-items-center p-3 profile_section">
      <Alert isOpen={alertInfo.show} color={alertInfo.color} role="alert">
        {alertInfo.message}
      </Alert>

      {currentUser && (
        <>
          <ConfirmationModal
            isOpen={openAccountDeletionModal}
            toggle={toggleAccountDeletionModal}
            onConfirm={deleteUser}
            message="Are you sure you want to delete the account?"
            heading="Account Deletion"
          />

          <div className="profile_container">
            <div className="profile_card">
              <div className="d-flex flex-column align-items-center p-3 pb-2 row-gap-2 border-bottom">
                <img src={avatar} className="avatar_img" alt="User Avatar" />
                <h6 id="profile_name" className="fw-bold mt-1 text-secondary">
                  {activeUser.name}
                </h6>
              </div>
              <div className="p-3 py-2" aria-label="Profile navigation">
                {currentUser.type === "customer" ? (
                  <>
                    <Link className="profile_menu" to="/my_cattle_list">
                      <i className="fa-solid fa-paw"></i>
                      <p>Cattle List</p>
                    </Link>
                    <Link className="profile_menu">
                      <i className="fa-solid fa-star"></i>
                      <p>Favourites</p>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link className="profile_menu">
                      <i className="fa-solid fa-list"></i>
                      <p>Cattle List</p>
                    </Link>
                    <Link className="profile_menu">
                      <i className="fa-solid fa-circle-check"></i>
                      <p>Verified Cattles</p>
                    </Link>
                    <Link className="profile_menu">
                      <i className="fa-solid fa-circle-xmark"></i>
                      <p>Rejected Cattles</p>
                    </Link>
                  </>
                )}
                <div className="profile_menu" onClick={logOut}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <p>Log Out</p>
                </div>
                {currentUser.type === "customer" && (
                  <div
                    className="profile_menu delete_menu"
                    onClick={toggleAccountDeletionModal}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                    <p>Delete Account</p>
                  </div>
                )}
              </div>
            </div>
            <div className="main_content">
              <h5 className="fw-bold text-secondary text-center">Profile</h5>
              <Form>
                <div className="d-flex flex-column row-gap-2 mt-1 mb-4">
                  <div>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      id="name"
                      value={userInfo.name}
                      onChange={(ev) => updateUserInfo(ev.target.value, "name")}
                      disabled={!enableForm}
                      maxLength={24}
                      invalid={enableForm && userInfo.name.trim().length < 3}
                      valid={enableForm && userInfo.name.trim().length > 2}
                      aria-label="Full Name"
                    />
                    <FormFeedback>Atleast 3 chars</FormFeedback>
                  </div>
                  <div>
                    <Label for="phone">Phone</Label>
                    <Input
                      type="tel"
                      id="phone"
                      value={userInfo.phone}
                      onChange={(ev) =>
                        updateUserInfo(ev.target.value, "phone")
                      }
                      disabled={true}
                      aria-label="Phone number"
                      inputMode="numeric"
                    />
                    <FormFeedback>
                      Please enter a valid Mobile number
                    </FormFeedback>
                  </div>
                  <div>
                    <Label for="address">Address</Label>
                    <Input
                      type="text"
                      id="address"
                      value={userInfo.address}
                      onChange={(ev) =>
                        updateUserInfo(ev.target.value, "address")
                      }
                      disabled={!enableForm}
                      maxLength={240}
                      invalid={
                        enableForm &&
                        userInfo.address.length > 0 &&
                        userInfo.address.trim().length < 6
                      }
                      valid={enableForm && userInfo.address.trim().length > 5}
                      aria-label="Address"
                    />
                    <FormFeedback>Atleast 6 chars</FormFeedback>
                  </div>
                  <div>
                    <Label>District</Label>
                    <Select
                      options={districts}
                      value={districts.find(
                        (e) => e.value === userInfo.district
                      )}
                      onChange={(e) => updateUserInfo(e.value, "district")}
                      isDisabled={!enableForm}
                    />
                  </div>
                  <div>
                    <Label for="pincode">Pincode</Label>
                    <Input
                      type="number"
                      id="pincode"
                      value={userInfo.pincode}
                      onChange={(ev) =>
                        updateUserInfo(ev.target.value, "pincode")
                      }
                      disabled={!enableForm}
                      invalid={
                        enableForm &&
                        userInfo.pincode.length > 0 &&
                        !/^\d{6}$/.test(userInfo.pincode)
                      }
                      valid={enableForm && /^\d{6}$/.test(userInfo.pincode)}
                      aria-label="Pincode"
                      inputMode="numeric"
                    />
                    <FormFeedback>Please enter a valid Pincode</FormFeedback>
                  </div>
                </div>
                {enableForm ? (
                  <div className="d-flex justify-content-between px-5">
                    <PrimaryButton
                      disabled={!enableSaveForm}
                      type="button"
                      className="px-3"
                      onClick={saveForm}
                    >
                      Save
                    </PrimaryButton>
                    <CancelButton
                      type="button"
                      onClick={() => {
                        setEnableForm(false);
                        setFormValues();
                      }}
                    >
                      Cancel
                    </CancelButton>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <SecondaryButton
                      type="button"
                      className="px-3"
                      onClick={() => setEnableForm(true)}
                    >
                      Edit
                    </SecondaryButton>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Profile;
